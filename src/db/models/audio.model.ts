import { Models } from '@enums';
import type { IAudio } from '@types';
import type { Model } from 'mongoose';
import { model, Schema } from 'mongoose';

const audioSchema = new Schema<IAudio>(
  {
    name: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      required: false,
      default: '#',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    usersLiked: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    listenCount: {
      type: Number,
      default: 0,
    },
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    genres: [
      {
        type: String,
        required: true,
        enum: '',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const testModel: Model<IAudio> = model(Models.USER, audioSchema);
