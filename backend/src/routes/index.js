import { Router } from 'express';
import { router as fieldsRouter } from './fields.js';
import { router as cropsRouter } from './crops.js';
import { router as animalsRouter } from './animals.js';
import { router as tasksRouter } from './tasks.js';
import { router as chatRouter } from './chat.js';

export const router = Router();

router.use('/fields', fieldsRouter);
router.use('/crops', cropsRouter);
router.use('/animals', animalsRouter);
router.use('/tasks', tasksRouter);
router.use('/chat', chatRouter);



