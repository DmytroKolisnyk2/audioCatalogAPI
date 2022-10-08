import type { Types } from 'mongoose';

export interface IAudio {
  name: string;
  fileUrl: string;
  coverUrl: string;
  author: Types.ObjectId;
  usersLiked: Types.ObjectId[];
  listenCount: number;
  playlists: Types.ObjectId[];
  genres: string[];
}
