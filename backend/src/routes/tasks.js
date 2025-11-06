import { Router } from 'express';
import { getDatabase } from '../sqlite.js';

export const router = Router();
const db = getDatabase();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM tasks ORDER BY id DESC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Task not found' });
  res.json(row);
});

router.post('/', (req, res) => {
  const { title, description = null, due_on = null, status = 'pending', field_id = null, crop_id = null, animal_id = null } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const info = db.prepare('INSERT INTO tasks (title, description, due_on, status, field_id, crop_id, animal_id) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(title, description, due_on, status, field_id, crop_id, animal_id);
  const created = db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Task not found' });
  const { title = existing.title, description = existing.description, due_on = existing.due_on, status = existing.status, field_id = existing.field_id, crop_id = existing.crop_id, animal_id = existing.animal_id } = req.body;
  db.prepare('UPDATE tasks SET title = ?, description = ?, due_on = ?, status = ?, field_id = ?, crop_id = ?, animal_id = ? WHERE id = ?')
    .run(title, description, due_on, status, field_id, crop_id, animal_id, id);
  const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});



