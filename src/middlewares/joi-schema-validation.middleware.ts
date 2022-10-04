import type { NextFunction, Request, Response } from 'express';
import type { Schema } from 'joi';

export const JoiValidationMiddleware =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new Error(error.message);
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ 'message': error.message });
    }
  };
