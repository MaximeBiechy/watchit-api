import { Request, Response, NextFunction } from 'express';
import { BadRequest, HttpError } from 'express-openapi-validator/dist/framework/types.js';
import logger from '../../shared/utils/logger.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../shared/errors/index.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  switch (true) {
    case err instanceof HttpError:
      logger.error(err, 'Openapi Error Validator');
      const statusCode = err.status || 500;
      const response = {
        message: err.message,
        code: err?.constructor?.name || 'UnknownError',
        ...(err instanceof BadRequest ? { errors: err.errors } : {}),
      };
      return res.status(statusCode).json(response);
    case err instanceof DatabaseError:
      return res.status(500).json({
        message: err.message,
        code: 'DatabaseError',
      });
    case err instanceof NotFoundError:
      return res.status(404).json({
        message: err.message,
        code: 'NotFoundError',
      });
    case err instanceof ValidationError:
      return res.status(400).json({
        message: err.message,
        code: 'ValidationError',
      });
    default:
      break;
  }

  logger.error(err, 'Internal Server Error');

  return res.status(500).json({
    message: 'Internal Server Error',
    code: 'InternalServerError',
  });
};
