const supportedExtensions = ['.docx', '.txt', '.md', '.odt', '.pdf', '.epub'];
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;

export const isSupportedFile = (fileName: string): boolean => {
  return supportedExtensions.some((extension) => fileName.toLowerCase().endsWith(extension));
};

export const validateImportFile = (
  fileName: string,
  fileSize = 0
): { valid: boolean; reason?: string } => {
  if (!isSupportedFile(fileName)) {
    return { valid: false, reason: 'Unsupported file format' };
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    return { valid: false, reason: 'File exceeds maximum supported size' };
  }

  return { valid: true };
};

export const normalizeExportContent = (content: string): string => content.replace(/\r\n/g, '\n');
