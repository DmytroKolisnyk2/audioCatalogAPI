import type { Types } from 'mongoose';

export interface IPayload {
  _id: Types.ObjectId;
  username: string;
}
