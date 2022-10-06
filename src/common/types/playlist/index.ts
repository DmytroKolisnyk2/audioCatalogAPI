import type { Types } from 'mongoose';

export interface IPlayList {
  name: string;
  audios: Types.ObjectId[];
  owner: Types.ObjectId;
  genres: string[];
}
