import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const openApiValidator = OpenApiValidator.middleware({
  apiSpec: path.resolve(__dirname, '../../../openapi-watchit.yaml'),
  validateApiSpec: true,
  validateRequests: {
    allowUnknownQueryParameters: false,
    removeAdditional: 'all',
  },
  validateResponses: {
    removeAdditional: 'all',
    onError: (err: any, body: any) => {
      logger.error(err, 'Openapi Response Validator', body);
    },
  },
});
