import type { Types } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  followers: Types.ObjectId[];
  likedAudios: Types.ObjectId[];
  createdAudios: Types.ObjectId[];
  profile: Types.ObjectId;
  playlist: Types.ObjectId[];
  role: string;
  history: Types.ObjectId[];
}
