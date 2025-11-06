import { Router } from 'express';
import { getDatabase } from '../sqlite.js';

export const router = Router();
const db = getDatabase();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM fields ORDER BY id DESC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM fields WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Field not found' });
  res.json(row);
});

router.post('/', (req, res) => {
  const { name, area_acres = 0, location = null } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const info = db.prepare('INSERT INTO fields (name, area_acres, location) VALUES (?, ?, ?)').run(name, area_acres, location);
  const created = db.prepare('SELECT * FROM fields WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const existing = db.prepare('SELECT * FROM fields WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Field not found' });
  const { name = existing.name, area_acres = existing.area_acres, location = existing.location } = req.body;
  db.prepare('UPDATE fields SET name = ?, area_acres = ?, location = ? WHERE id = ?').run(name, area_acres, location, id);
  const updated = db.prepare('SELECT * FROM fields WHERE id = ?').get(id);
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const info = db.prepare('DELETE FROM fields WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Field not found' });
  res.status(204).send();
});



