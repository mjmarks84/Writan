export const APP_NAME = 'Writan';

export const WRITAN_DIR_NAME = '.writan';
export const WRITAN_DATA_SUBDIR = 'data';
export const WRITAN_DATABASE_NAME = 'writan.db';
export const WRITAN_LOG_NAME = 'writan.log';

export const MAX_IMPORT_FILE_SIZE_BYTES = 50 * 1024 * 1024;
export const AUTO_SAVE_INTERVAL_MS = 30_000;
export const MAX_VERSION_HISTORY = 20;
export const VERSION_RETENTION_DAYS = 30;

export const IMPORT_FORMATS = ['.docx', '.txt', '.md', '.odt', '.pdf'] as const;
export const EXPORT_FORMATS = ['.docx', '.pdf', '.txt', '.md', '.odt', '.epub'] as const;

export type ImportFormat = (typeof IMPORT_FORMATS)[number];
export type ExportFormat = (typeof EXPORT_FORMATS)[number];

// Backwards compatible aliases used by the initial scaffold.
export const SUPPORTED_IMPORT_FORMATS: readonly string[] = IMPORT_FORMATS;
export const SUPPORTED_EXPORT_FORMATS: readonly string[] = EXPORT_FORMATS;
