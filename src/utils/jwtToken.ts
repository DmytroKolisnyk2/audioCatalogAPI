import jwt from 'jsonwebtoken';
import type { IPayload } from '@types';
import { JwtConfig } from '@constants';

const options = {
  expiresIn: JwtConfig.DAYS,
};

export const generate = (payload: IPayload): string =>
  jwt.sign(payload, process.env.JWT_SECRET, options);
