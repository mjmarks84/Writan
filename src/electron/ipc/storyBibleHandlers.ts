import type {
  Character,
  CharacterRelationship,
  CrossReference,
  Location,
  PlotPoint,
  StoryBibleSearchFilters,
  StoryBibleSearchResult,
  StoryBibleTag,
  Theme,
  TimelineEvent,
} from '../../shared/types';

interface DBStatement<T = unknown> {
  run: (...params: unknown[]) => T;
  all: (...params: unknown[]) => T[];
  get: (...params: unknown[]) => T | undefined;
}

interface SQLiteLike {
  exec: (sql: string) => void;
  prepare: <T = unknown>(sql: string) => DBStatement<T>;
}

interface IpcMainLike {
  handle: (channel: string, listener: (_event: unknown, ...args: any[]) => any) => void;
}

const serialize = (value: unknown): string | null => {
  if (value == null) return null;
  if (Array.isArray(value) || typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const parseJSON = <T>(value: unknown, fallback: T): T => {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const now = () => new Date().toISOString();

export const STORY_BIBLE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  archetype TEXT,
  age INTEGER,
  gender TEXT,
  physicalDescription TEXT,
  personality TEXT,
  background TEXT,
  motivations TEXT,
  conflicts TEXT,
  relationshipNotes TEXT,
  imageUrl TEXT,
  status TEXT DEFAULT 'alive',
  tags TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS characterRelationships (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  character1Id TEXT NOT NULL,
  character2Id TEXT NOT NULL,
  relationshipType TEXT,
  description TEXT,
  isBidirectional BOOLEAN DEFAULT 1,
  FOREIGN KEY (projectId) REFERENCES projects(id),
  FOREIGN KEY (character1Id) REFERENCES characters(id),
  FOREIGN KEY (character2Id) REFERENCES characters(id)
);

CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT,
  region TEXT,
  description TEXT,
  climate TEXT,
  geography TEXT,
  culture TEXT,
  population TEXT,
  economy TEXT,
  history TEXT,
  imageUrl TEXT,
  mapUrl TEXT,
  tags TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS plotPoints (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  plotType TEXT,
  "order" INTEGER,
  importance INTEGER DEFAULT 5,
  connectedCharacters TEXT,
  connectedLocations TEXT,
  connectedThemes TEXT,
  timelinePosition TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS timelineEvents (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  eventType TEXT,
  eventDate TEXT,
  "order" INTEGER,
  importance INTEGER DEFAULT 5,
  connectedCharacters TEXT,
  connectedLocations TEXT,
  connectedPlots TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS themes (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  thematicElements TEXT,
  connectedCharacters TEXT,
  connectedPlotPoints TEXT,
  symbolism TEXT,
  color TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS storyBibleTags (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  color TEXT,
  parentTagId TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS crossReferences (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  sourceId TEXT NOT NULL,
  sourceType TEXT,
  targetId TEXT NOT NULL,
  targetType TEXT,
  context TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id)
);
`;

export function initStoryBibleSchema(db: SQLiteLike): void {
  db.exec(STORY_BIBLE_SCHEMA_SQL);
}

const transformEntityRow = <T extends Record<string, any>>(row: T): T => ({
  ...row,
  tags: parseJSON<string[]>(row.tags, []),
  connectedCharacters: parseJSON<string[]>(row.connectedCharacters, []),
  connectedLocations: parseJSON<string[]>(row.connectedLocations, []),
  connectedThemes: parseJSON<string[]>(row.connectedThemes, []),
  connectedPlots: parseJSON<string[]>(row.connectedPlots, []),
  connectedPlotPoints: parseJSON<string[]>(row.connectedPlotPoints, []),
});

export function registerStoryBibleHandlers(ipcMain: IpcMainLike, db: SQLiteLike): void {
  initStoryBibleSchema(db);

  ipcMain.handle('storyBible:characters:list', (_e, projectId: string) => {
    const rows = db.prepare<Character>('SELECT * FROM characters WHERE projectId = ? ORDER BY name').all(projectId);
    return rows.map(transformEntityRow);
  });

  ipcMain.handle('storyBible:characters:save', (_e, character: Character) => {
    const timestamp = now();
    db.prepare(
      `INSERT INTO characters (id, projectId, name, role, archetype, age, physicalDescription, personality, background, motivations, conflicts, relationshipNotes, imageUrl, status, tags, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         name=excluded.name,
         role=excluded.role,
         archetype=excluded.archetype,
         age=excluded.age,
         physicalDescription=excluded.physicalDescription,
         personality=excluded.personality,
         background=excluded.background,
         motivations=excluded.motivations,
         conflicts=excluded.conflicts,
         relationshipNotes=excluded.relationshipNotes,
         imageUrl=excluded.imageUrl,
         status=excluded.status,
         tags=excluded.tags,
         updatedAt=excluded.updatedAt`
    ).run(
      character.id,
      character.projectId,
      character.name,
      character.role ?? null,
      character.archetype ?? null,
      character.age ?? null,
      character.physicalDescription ?? null,
      character.personality ?? null,
      character.background ?? null,
      character.motivations ?? null,
      character.conflicts ?? null,
      character.relationshipNotes ?? null,
      character.imageUrl ?? null,
      character.status ?? 'alive',
      serialize(character.tags),
      character.createdAt || timestamp,
      timestamp
    );

    return { ...character, updatedAt: timestamp };
  });

  ipcMain.handle('storyBible:characters:delete', (_e, id: string) => {
    db.prepare('DELETE FROM characters WHERE id = ?').run(id);
    db.prepare('DELETE FROM characterRelationships WHERE character1Id = ? OR character2Id = ?').run(id, id);
    return true;
  });

  ipcMain.handle('storyBible:relationships:list', (_e, projectId: string) => {
    return db
      .prepare<CharacterRelationship>('SELECT * FROM characterRelationships WHERE projectId = ?')
      .all(projectId);
  });

  ipcMain.handle('storyBible:relationships:save', (_e, relationship: CharacterRelationship) => {
    db.prepare(
      `INSERT INTO characterRelationships (id, projectId, character1Id, character2Id, relationshipType, description, isBidirectional)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         character1Id=excluded.character1Id,
         character2Id=excluded.character2Id,
         relationshipType=excluded.relationshipType,
         description=excluded.description,
         isBidirectional=excluded.isBidirectional`
    ).run(
      relationship.id,
      relationship.projectId,
      relationship.character1Id,
      relationship.character2Id,
      relationship.relationshipType ?? null,
      relationship.description ?? null,
      relationship.isBidirectional ?? 1
    );
    return relationship;
  });

  const entityConfig = {
    locations: { table: 'locations', title: 'name' },
    plotPoints: { table: 'plotPoints', title: 'title' },
    timelineEvents: { table: 'timelineEvents', title: 'title' },
    themes: { table: 'themes', title: 'name' },
  } as const;

  (Object.keys(entityConfig) as (keyof typeof entityConfig)[]).forEach((entityKey) => {
    const { table } = entityConfig[entityKey];

    ipcMain.handle(`storyBible:${entityKey}:list`, (_e, projectId: string) => {
      const rows = db.prepare(`SELECT * FROM ${table} WHERE projectId = ? ORDER BY updatedAt DESC`).all(projectId);
      return rows.map(transformEntityRow);
    });

    ipcMain.handle(`storyBible:${entityKey}:save`, (_e, payload: any) => {
      const columns = Object.keys(payload);
      const values = columns.map((column) => {
        const value = payload[column];
        if (Array.isArray(value) || (value && typeof value === 'object')) {
          return JSON.stringify(value);
        }
        return value;
      });

      const quotedColumns = columns.map((column) => `"${column}"`);
      const updates = columns.filter((c) => c !== 'id').map((c) => `"${c}"=excluded."${c}"`);
      db.prepare(
        `INSERT INTO ${table} (${quotedColumns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})
         ON CONFLICT(id) DO UPDATE SET ${updates.join(', ')}`
      ).run(...values);

      return payload;
    });

    ipcMain.handle(`storyBible:${entityKey}:delete`, (_e, id: string) => {
      db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
      return true;
    });
  });

  ipcMain.handle('storyBible:tags:list', (_e, projectId: string) => {
    return db.prepare<StoryBibleTag>('SELECT * FROM storyBibleTags WHERE projectId = ? ORDER BY name').all(projectId);
  });

  ipcMain.handle('storyBible:tags:save', (_e, tag: StoryBibleTag) => {
    db.prepare(
      `INSERT INTO storyBibleTags (id, projectId, name, category, color, parentTagId, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         name=excluded.name,
         category=excluded.category,
         color=excluded.color,
         parentTagId=excluded.parentTagId`
    ).run(tag.id, tag.projectId, tag.name, tag.category ?? null, tag.color ?? null, tag.parentTagId ?? null, tag.createdAt);
    return tag;
  });

  ipcMain.handle('storyBible:crossReferences:list', (_e, projectId: string) => {
    return db.prepare<CrossReference>('SELECT * FROM crossReferences WHERE projectId = ? ORDER BY createdAt DESC').all(projectId);
  });

  ipcMain.handle('storyBible:crossReferences:save', (_e, crossReference: CrossReference) => {
    db.prepare(
      `INSERT INTO crossReferences (id, projectId, sourceId, sourceType, targetId, targetType, context, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         sourceId=excluded.sourceId,
         sourceType=excluded.sourceType,
         targetId=excluded.targetId,
         targetType=excluded.targetType,
         context=excluded.context`
    ).run(
      crossReference.id,
      crossReference.projectId,
      crossReference.sourceId,
      crossReference.sourceType,
      crossReference.targetId,
      crossReference.targetType,
      crossReference.context ?? null,
      crossReference.createdAt
    );
    return crossReference;
  });

  ipcMain.handle('storyBible:search', (_e, projectId: string, filters: StoryBibleSearchFilters = {}) => {
    const query = (filters.query || '').trim().toLowerCase();
    const includeType = (type: StoryBibleSearchResult['type']) =>
      !filters.types?.length || filters.types.includes(type);

    const toResults = (rows: any[], type: StoryBibleSearchResult['type'], titleKey: string, subtitleKey?: string) =>
      rows
        .map(transformEntityRow)
        .filter((row) => {
          if (!query) return true;
          const text = `${row[titleKey] ?? ''} ${row.description ?? ''}`.toLowerCase();
          return text.includes(query);
        })
        .map<StoryBibleSearchResult>((row) => ({
          id: row.id,
          type,
          title: row[titleKey],
          subtitle: subtitleKey ? row[subtitleKey] : undefined,
          preview: row.description,
          tags: row.tags ?? [],
        }));

    const results: StoryBibleSearchResult[] = [];
    if (includeType('character')) {
      results.push(...toResults(db.prepare('SELECT * FROM characters WHERE projectId = ?').all(projectId), 'character', 'name', 'role'));
    }
    if (includeType('location')) {
      results.push(...toResults(db.prepare('SELECT * FROM locations WHERE projectId = ?').all(projectId), 'location', 'name', 'type'));
    }
    if (includeType('plotPoint')) {
      results.push(...toResults(db.prepare('SELECT * FROM plotPoints WHERE projectId = ?').all(projectId), 'plotPoint', 'title', 'plotType'));
    }
    if (includeType('timelineEvent')) {
      results.push(
        ...toResults(db.prepare('SELECT * FROM timelineEvents WHERE projectId = ?').all(projectId), 'timelineEvent', 'title', 'eventType')
      );
    }
    if (includeType('theme')) {
      results.push(...toResults(db.prepare('SELECT * FROM themes WHERE projectId = ?').all(projectId), 'theme', 'name'));
    }

    if (filters.tags?.length) {
      return results.filter((result) => result.tags?.some((tag) => filters.tags!.includes(tag)));
    }

    return results;
  });
}
