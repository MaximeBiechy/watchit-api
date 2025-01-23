import { Request, Response, NextFunction } from 'express';
import { BadRequest, HttpError } from 'express-openapi-validator/dist/framework/types.js';
import logger from '../../shared/utils/logger.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    logger.error(err, 'Openapi Error Validator');

    return res.status(err.status || 500).json({
      message: err.message,
      code: err?.constructor?.name || 'UnknownError',
      ...(err instanceof BadRequest
        ? {
            errors: err.errors,
          }
        : {}),
    });
  }

  // ! Add other error handling logic here i guess :D

  logger.error(err, 'Internal Server Error');

  return res.status(500).json({
    message: 'Internal Server Error',
    code: 'InternalServerError',
  });
};
