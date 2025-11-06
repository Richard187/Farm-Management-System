import Database from 'better-sqlite3';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

let dbInstance = null;

function ensureDirectoriesExist(filePath) {
  const folder = dirname(filePath);
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }
}

export function getDatabase() {
  if (dbInstance) return dbInstance;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const dbFile = join(__dirname, '..', 'data', 'farm.sqlite');
  ensureDirectoriesExist(dbFile);

  const db = new Database(dbFile);
  db.pragma('journal_mode = WAL');

  bootstrap(db);
  dbInstance = db;
  return dbInstance;
}

function bootstrap(db) {
  // fields
  db.prepare(`CREATE TABLE IF NOT EXISTS fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    area_acres REAL NOT NULL DEFAULT 0,
    location TEXT
  )`).run();

  // crops
  db.prepare(`CREATE TABLE IF NOT EXISTS crops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    field_id INTEGER,
    planted_on TEXT,
    expected_harvest_on TEXT,
    FOREIGN KEY(field_id) REFERENCES fields(id)
  )`).run();

  // animals
  db.prepare(`CREATE TABLE IF NOT EXISTS animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    tag TEXT,
    birthdate TEXT,
    location TEXT
  )`).run();

  // tasks
  db.prepare(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    due_on TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    field_id INTEGER,
    crop_id INTEGER,
    animal_id INTEGER,
    FOREIGN KEY(field_id) REFERENCES fields(id),
    FOREIGN KEY(crop_id) REFERENCES crops(id),
    FOREIGN KEY(animal_id) REFERENCES animals(id)
  )`).run();
}



