import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDTO<T extends object>(DTO: new (...args: any[]) => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(DTO, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const errorDetails = errors.map((err: any) => ({
        field: err.property,
        constraints: err.constraints,
      }));

      res.status(400).json({
        status: 'error',
        message: 'Validation error',
        code: 'ValidationError',
        errors: errorDetails,
      });
      return;
    }
    next();
  };
}
