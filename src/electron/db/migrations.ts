export interface Migration {
  version: number;
  name: string;
}

export const migrations: Migration[] = [
  { version: 1, name: 'create_documents' },
  { version: 2, name: 'add_versions' }
];

export const validateMigrationSequence = (items: Migration[]): boolean => {
  return items.every((migration, index) => migration.version === index + 1);
};
