import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path';
import logger from '../../shared/utils/logger.js';
import { __dirname } from '../../shared/utils/path.js';

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
