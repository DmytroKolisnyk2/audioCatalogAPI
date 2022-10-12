import type { Types } from 'mongoose';

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
  message: string;
  user: IUser;
  token: string;
}