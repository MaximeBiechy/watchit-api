import { Request, Response, NextFunction } from 'express';
import { BadRequest, HttpError } from 'express-openapi-validator/dist/framework/types.js';
import logger from '../../shared/utils/logger.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../shared/errors/index.js';

interface ErrorResponse {
  status: 'error';
  message: string;
  code: string;
  errors?: any;
  timestamp: string;
  path: string;
}

const formatError = (err: any, req: Request, status: number, code: string, errors?: any): ErrorResponse => {
  return {
    status: 'error',
    message: err.message,
    code,
    errors,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  };
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let errorResponse: ErrorResponse;

  switch (true) {
    case err instanceof HttpError:
      statusCode = err.status || 500;
      errorResponse = formatError(
        err,
        req,
        statusCode,
        err?.constructor?.name || 'UnknownError',
        err instanceof BadRequest ? err.errors : undefined,
      );
      logger.error(err, 'OpenAPI Error Validator');
      break;
    case err instanceof DatabaseError:
      statusCode = 500;
      errorResponse = formatError(err, req, statusCode, 'DatabaseError');
      logger.error(err, 'Database Error');
      break;
    case err instanceof NotFoundError:
      statusCode = 404;
      errorResponse = formatError(err, req, statusCode, 'NotFoundError');
      logger.warn(err, 'Not Found Error');
      break;
    case err instanceof ValidationError:
      statusCode = 400;
      errorResponse = formatError(err, req, statusCode, 'ValidationError');
      logger.warn(err, 'Validation Error');
      break;
    default:
      logger.error(err, 'Unhandled Internal Server Error');
      errorResponse = formatError(err, req, statusCode, 'InternalServerError');
      break;
  }

  res.status(statusCode).json(errorResponse);
};
