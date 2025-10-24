import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Read the generated swagger.json file
let swaggerDocument;
try {
  const swaggerPath = path.join(__dirname, '../docs/swagger.json');
  const swaggerFile = fs.readFileSync(swaggerPath, 'utf8');
  swaggerDocument = JSON.parse(swaggerFile);
} catch (error) {
  console.error('Failed to load swagger documentation:', error.message);
  // Fallback basic swagger document
  swaggerDocument = {
    openapi: '3.1.0',
    info: {
      title: 'Contact Management API',
      version: '1.0.0',
      description: 'API documentation is being generated. Please run `npm run build-docs` and restart the server.'
    },
    paths: {}
  };
}

// Swagger UI options
const options = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Contact Management API Documentation',
};

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, options));

export default router;