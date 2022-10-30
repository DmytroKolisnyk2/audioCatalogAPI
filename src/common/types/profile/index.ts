import type { Types } from 'mongoose';
import type { Languages, Themes } from '@enums';

export interface IProfile {
  user: Types.ObjectId;
  language: Languages;
  theme: Themes;
  avatarUrl: string;
  banner: string;
  genres: string[];
  saveHistory: boolean;
}

export interface UpdateProfileDto {
  language: Languages;
  theme: string;
  saveHistory: boolean;
}
