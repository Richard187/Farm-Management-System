import { Router } from 'express';
import { getDatabase } from '../sqlite.js';

export const router = Router();
const db = getDatabase();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM animals ORDER BY id DESC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM animals WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Animal not found' });
  res.json(row);
});

router.post('/', (req, res) => {
  const { type, tag = null, birthdate = null, location = null } = req.body;
  if (!type) return res.status(400).json({ error: 'type is required' });
  const info = db.prepare('INSERT INTO animals (type, tag, birthdate, location) VALUES (?, ?, ?, ?)')
    .run(type, tag, birthdate, location);
  const created = db.prepare('SELECT * FROM animals WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const existing = db.prepare('SELECT * FROM animals WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Animal not found' });
  const { type = existing.type, tag = existing.tag, birthdate = existing.birthdate, location = existing.location } = req.body;
  db.prepare('UPDATE animals SET type = ?, tag = ?, birthdate = ?, location = ? WHERE id = ?')
    .run(type, tag, birthdate, location, id);
  const updated = db.prepare('SELECT * FROM animals WHERE id = ?').get(id);
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const info = db.prepare('DELETE FROM animals WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Animal not found' });
  res.status(204).send();
});



