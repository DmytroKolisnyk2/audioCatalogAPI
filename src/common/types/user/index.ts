import type { Types } from 'mongoose';
import type {Request} from 'express';

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  password: string;
  followers?: Types.ObjectId[];
  likedAudios?: Types.ObjectId[];
  createdAudios?: Types.ObjectId[];
  profile?: Types.ObjectId;
  playlist?: Types.ObjectId[];
  role?: string;
  history?: Types.ObjectId[];
}

export interface UserDto {
  user: IUser;
  token: string;
}

export interface IAuth extends Request {
  user: IUser;
}