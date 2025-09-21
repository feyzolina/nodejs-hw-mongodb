import express from 'express';
import cors from 'cors';
import pino from 'pino';

import {
  getContactsController,
  getContactByIdController,
  seedContactsController,
} from './controllers/contacts.js';

const logger = pino();

export const setupServer = () => {
  const app = express();

  // CORS middleware
  app.use(cors());

  // JSON middleware
  app.use(express.json());

  // Logger middleware
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });

  // Routes
  app.get('/contacts', getContactsController);
  app.get('/contacts/:contactId', getContactByIdController);
  
  // Geçici seed endpoint - sadece ilk deploy için
  app.post('/seed', seedContactsController);

  // 404 handler for non-existent routes
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
};