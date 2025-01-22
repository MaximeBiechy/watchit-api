import '../config/instrument.js';
import * as Sentry from '@sentry/node';
import express, { Request, Response } from 'express';
import routes from './routes/v1/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { openApiValidator, errorHandler } from './middlewares/index.js';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.resolve(__dirname, '../../openapi-watchit.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(openApiValidator);

// Define routes here
app.use('/api/v1', routes);

// ? Route to test Sentry error handling
app.get('/debug-sentry', function mainHandler(req: Request, res: Response) {
  throw new Error('My first Sentry error!');
});

// ! The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// @ts-ignore
app.use(errorHandler);

export default app;
