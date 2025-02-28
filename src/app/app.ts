import '../config/instrument.js';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import express, { Request, Response } from 'express';
import routes from '../interface/routes/v1/index.js';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { openApiValidator, errorHandler } from './middlewares/index.js';
import { __dirname } from '../shared/utils/path.js';

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(path.resolve(__dirname, '../../../openapi-watchit.yaml'));

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
