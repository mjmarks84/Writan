import fs from 'node:fs';
import path from 'node:path';
import { dialog, ipcMain as electronIpcMain, type IpcMain } from 'electron';
import { marked } from 'marked';
import { Document, Packer, Paragraph } from 'docx';
import JSZip from 'jszip';
import pdfParse from 'pdf-parse';
import PDFDocument from 'pdfkit';
import {
  MAX_IMPORT_FILE_SIZE_BYTES,
  SUPPORTED_EXPORT_FORMATS,
  SUPPORTED_IMPORT_FORMATS,
} from '../../shared/constants';
import type { ExportRequest, ImportedDocument } from '../../shared/types';
import { logger } from '../utils/logger';

interface IpcMainLike {
  handle(channel: string, listener: (_event: unknown, ...args: any[]) => any): void;
}

const ENCODINGS_TO_TRY: BufferEncoding[] = ['utf8', 'utf16le', 'latin1'];

function decodeText(buffer: Buffer): string {
  for (const encoding of ENCODINGS_TO_TRY) {
    const value = buffer.toString(encoding);
    if (!value.includes('\uFFFD')) return value;
  }
  return buffer.toString('utf8');
}

function inferTitle(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

async function readZipTextAndMetadata(filePath: string, contentPath: string): Promise<{ text: string; title?: string; author?: string }> {
  const zip = await JSZip.loadAsync(fs.readFileSync(filePath));
  const content = await zip.file(contentPath)?.async('string');
  if (!content) throw new Error(`Missing ${contentPath} in archive`);

  const coreXml = await zip.file('docProps/core.xml')?.async('string');
  const title = coreXml?.match(/<dc:title>([\s\S]*?)<\/dc:title>/)?.[1];
  const author = coreXml?.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/)?.[1];

  const text = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return { text, title, author };
}

async function importFile(filePath: string): Promise<ImportedDocument> {
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);

  if (stat.size > MAX_IMPORT_FILE_SIZE_BYTES) {
    throw new Error('File is larger than 50MB. Please split the document and retry.');
  }

  if (ext === '.txt' || ext === '.md') {
    const raw = fs.readFileSync(filePath);
    const content = decodeText(raw);
    return {
      title: inferTitle(filePath),
      content,
      sourcePath: filePath,
      format: ext,
    };
  }

  if (ext === '.docx') {
    const { text, title, author } = await readZipTextAndMetadata(filePath, 'word/document.xml');
    return { title: title ?? inferTitle(filePath), author, content: text, sourcePath: filePath, format: '.docx' };
  }

  if (ext === '.odt') {
    const zip = await JSZip.loadAsync(fs.readFileSync(filePath));
    const contentXml = await zip.file('content.xml')?.async('string');
    const metaXml = await zip.file('meta.xml')?.async('string');
    if (!contentXml) throw new Error('Invalid ODT: missing content.xml');

    const content = contentXml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const title = metaXml?.match(/<dc:title>([\s\S]*?)<\/dc:title>/)?.[1] ?? inferTitle(filePath);
    const author = metaXml?.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/)?.[1];

    return { title, author, content, sourcePath: filePath, format: '.odt' };
  }

  if (ext === '.pdf') {
    const raw = fs.readFileSync(filePath);
    const parsed = await pdfParse(raw);
    const content = parsed.text.trim();

    return {
      title: inferTitle(filePath),
      content,
      sourcePath: filePath,
      format: '.pdf',
    };
  }

  throw new Error(`Unsupported import format: ${ext}`);
}

async function exportTxt(req: ExportRequest): Promise<void> {
  fs.writeFileSync(req.outputPath, req.content, 'utf8');
}

async function exportMarkdown(req: ExportRequest): Promise<void> {
  const sections = req.chapters?.length
    ? req.chapters.map((c) => `## ${c.title}\n\n${c.content}`).join('\n\n')
    : req.content;
  fs.writeFileSync(req.outputPath, `# ${req.title}\n\n${sections}\n`, 'utf8');
}

async function exportDocx(req: ExportRequest): Promise<void> {
  const lines = req.content.split(/\n+/g).filter(Boolean);
  const doc = new Document({
    creator: req.author,
    title: req.title,
    sections: [{ children: lines.map((line) => new Paragraph(line)) }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(req.outputPath, buffer);
}

async function exportPdf(req: ExportRequest): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const doc = new PDFDocument({ info: { Title: req.title, Author: req.author } });
    const stream = fs.createWriteStream(req.outputPath);
    doc.pipe(stream);
    doc.fontSize(18).text(req.title, { underline: true });
    if (req.author) doc.moveDown().fontSize(11).text(`By ${req.author}`);
    doc.moveDown().fontSize(12).text(req.content, {
      width: 460,
      align: 'left',
      lineGap: 4,
    });
    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
}

async function exportOdt(req: ExportRequest): Promise<void> {
  const zip = new JSZip();
  zip.file('mimetype', 'application/vnd.oasis.opendocument.text', { compression: 'STORE' });
  zip.file('content.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"><office:body><office:text><text:p>${req.content.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text:p></office:text></office:body></office:document-content>`);
  zip.file('meta.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><office:meta><dc:title>${req.title}</dc:title><dc:creator>${req.author ?? ''}</dc:creator></office:meta></office:document-meta>`);

  const content = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(req.outputPath, content);
}

async function exportEpub(req: ExportRequest): Promise<void> {
  const zip = new JSZip();
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
  zip.file('META-INF/container.xml', `<?xml version="1.0"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>`);

  const htmlBody = marked.parse(req.content);
  zip.file('OEBPS/content.xhtml', `<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>${req.title}</title></head><body>${htmlBody}</body></html>`);
  zip.file('OEBPS/content.opf', `<?xml version="1.0" encoding="UTF-8"?><package version="2.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>${req.title}</dc:title><dc:creator>${req.author ?? ''}</dc:creator><dc:language>en</dc:language></metadata><manifest><item id="content" href="content.xhtml" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="content"/></spine></package>`);

  const content = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(req.outputPath, content);
}

async function exportDocument(req: ExportRequest): Promise<void> {
  const ext = path.extname(req.outputPath).toLowerCase();
  if (ext === '.txt') return exportTxt(req);
  if (ext === '.md') return exportMarkdown(req);
  if (ext === '.docx') return exportDocx(req);
  if (ext === '.pdf') return exportPdf(req);
  if (ext === '.odt') return exportOdt(req);
  if (ext === '.epub') return exportEpub(req);
  throw new Error(`Unsupported export format: ${ext}`);
}

export function registerFileHandlers(ipcMain: IpcMainLike | IpcMain = electronIpcMain): void {
  ipcMain.handle('file:import', async (_event, filePath: string) => {
    try {
      const result = await importFile(filePath);
      logger.info('File imported', { filePath, format: result.format });
      return { ok: true, data: result };
    } catch (error) {
      logger.error('Import failed', { filePath, error: String(error) });
      return { ok: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('file:export', async (_event, request: ExportRequest) => {
    try {
      await exportDocument(request);
      logger.info('File exported', { outputPath: request.outputPath });
      return { ok: true };
    } catch (error) {
      logger.error('Export failed', { outputPath: request.outputPath, error: String(error) });
      return { ok: false, error: (error as Error).message };
    }
  });

  // Backwards compatible scaffold dialog channels
  ipcMain.handle('file:openDialog', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Supported files', extensions: SUPPORTED_IMPORT_FORMATS.map((ext) => ext.slice(1)) }],
    });
    return result.filePaths;
  });

  ipcMain.handle('file:saveDialog', async () => {
    const result = await dialog.showSaveDialog({
      filters: [{ name: 'Export formats', extensions: SUPPORTED_EXPORT_FORMATS.map((ext) => ext.slice(1)) }],
    });
    return result.filePath;
  });
}

export const fileImportExport = { importFile, exportDocument };
