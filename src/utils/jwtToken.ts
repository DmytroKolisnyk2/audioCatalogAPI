import jwt from 'jsonwebtoken';
import type { IPayload } from '@types';

const options = {
  expiresIn: '7d',
};

export const generate = (payload: IPayload): string => jwt.sign(payload, process.env.JWT_SECRET, options);