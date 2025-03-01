import { Request, Response, NextFunction } from 'express';
import { BadRequest, HttpError } from 'express-openapi-validator/dist/framework/types.js';
import logger from '../../shared/utils/logger.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../shared/errors/index.js';

interface ErrorResponse {
  status: string;
  message: string;
  code: string;
  errors?: any;
  timestamp: string;
  path: string;
}

const formatError = (err: any, req: Request, status: number, code: string, errors?: any): ErrorResponse => {
  return {
    status: `Error: ${status}`,
    message: err.message,
    code,
    errors,
    timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }).split(',').join(''),
    path: req.originalUrl,
  };
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let errorResponse: ErrorResponse;

  switch (true) {
    case err instanceof HttpError:
      statusCode = err.status || 400;
      errorResponse = formatError(
        err,
        req,
        statusCode,
        err?.constructor?.name || 'OpenAPIValidationError',
        err instanceof BadRequest ? err.errors : undefined,
      );
      logger.error(err, 'OpenAPI Error Validator');
      break;
    case err instanceof DatabaseError:
      statusCode = err.status || 500;
      errorResponse = formatError(err, req, statusCode, err.code);
      logger.error(err, 'Database Error');
      break;
    case err instanceof NotFoundError:
      statusCode = err.status || 404;
      errorResponse = formatError(err, req, statusCode, err.code);
      logger.warn(err, 'Not Found Error');
      break;
    case err instanceof ValidationError:
      statusCode = err.status || 400;
      errorResponse = formatError(err, req, statusCode, err.code);
      logger.warn(err, 'Validation Error');
      break;
    default:
      logger.error(err, 'Unhandled Internal Server Error');
      errorResponse = formatError(err, req, statusCode, 'InternalServerError');
      break;
  }

  res.status(statusCode).json(errorResponse);
};
