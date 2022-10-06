import type { Types } from 'mongoose';
import { Languages } from '@enums';

export interface IProfile {
  username: Types.ObjectId;
  language: Languages;
  theme: string;
  avatarUrl: string;
  banner: string;
  genres: string[];
  saveHistory: boolean;
}
