import type { Types } from 'mongoose';
import type { Languages } from '@enums';

export interface IProfile {
  user: Types.ObjectId;
  language: Languages;
  theme: string;
  avatarUrl: string;
  banner: string;
  genres: string[];
  saveHistory: boolean;
}
