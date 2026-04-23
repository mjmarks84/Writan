import { migrations, validateMigrationSequence } from '../migrations';

describe('migration system', () => {
  it('validates ordered versions', () => {
    expect(validateMigrationSequence(migrations)).toBe(true);
  });
});
