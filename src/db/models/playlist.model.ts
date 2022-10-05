import { Models } from '@enums';
import type { IPlayList } from '@types';
import type { Model } from 'mongoose';
import { model, Schema } from 'mongoose';

const playlistSchema = new Schema<IPlayList>(
  {
    name: {
      type: 'string',
      required: true,
    },
    audios: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Audio',
        required: true,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
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

export const testModel: Model<IPlayList> = model(Models.USER, playlistSchema);
