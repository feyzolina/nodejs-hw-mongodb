import express from 'express';
import cors from 'cors';
import pino from 'pino';
import cookieParser from 'cookie-parser';
import path from 'path';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const logger = pino();

export const setupServer = () => {
  const app = express();

  // CORS middleware
  app.use(cors());

  // JSON middleware
  app.use(express.json());

  // Cookie parser middleware
  app.use(cookieParser());

  // Logger middleware
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });

  // Static files for reset password page
  app.use(express.static('public'));
  
  // Reset password page route
  app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'reset-password.html'));
  });

  // Routes
  app.use('/auth', authRouter);
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