import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { getDatabase } from './sqlite.js';
import { router as apiRouter } from './routes/index.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: '*'}));
app.use(express.json());
app.use(morgan('dev'));

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize DB (creates file and tables if missing)
getDatabase();

// API routes
app.use('/api', apiRouter);

// Centralized 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Farm Management API listening on port ${PORT}`);
});



