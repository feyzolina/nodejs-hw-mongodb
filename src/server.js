import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

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
  app.use('/', contactsRouter);

  // 404 handler for non-existent routes
  app.use(notFoundHandler);

  // Error handler middleware (must be last)
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
};