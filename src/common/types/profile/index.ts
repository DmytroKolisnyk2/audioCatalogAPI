import type { Types } from 'mongoose';

export interface IProfile {
  username: Types.ObjectId;
  language: string;
  theme: string;
  avatarUrl: string;
  banner: string;
  genres: string[];
  saveHistory: boolean;
}
