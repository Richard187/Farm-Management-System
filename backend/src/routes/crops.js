import { Router } from 'express';
import { getDatabase } from '../sqlite.js';

export const router = Router();
const db = getDatabase();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM crops ORDER BY id DESC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM crops WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Crop not found' });
  res.json(row);
});

router.post('/', (req, res) => {
  const { name, field_id = null, planted_on = null, expected_harvest_on = null } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const info = db.prepare('INSERT INTO crops (name, field_id, planted_on, expected_harvest_on) VALUES (?, ?, ?, ?)')
    .run(name, field_id, planted_on, expected_harvest_on);
  const created = db.prepare('SELECT * FROM crops WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const existing = db.prepare('SELECT * FROM crops WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Crop not found' });
  const { name = existing.name, field_id = existing.field_id, planted_on = existing.planted_on, expected_harvest_on = existing.expected_harvest_on } = req.body;
  db.prepare('UPDATE crops SET name = ?, field_id = ?, planted_on = ?, expected_harvest_on = ? WHERE id = ?')
    .run(name, field_id, planted_on, expected_harvest_on, id);
  const updated = db.prepare('SELECT * FROM crops WHERE id = ?').get(id);
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const info = db.prepare('DELETE FROM crops WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Crop not found' });
  res.status(204).send();
});



