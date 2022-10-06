import  { Models, Refs, Genres } from '@enums';
import type { IPlayList } from '@types';
import type { Model } from 'mongoose';
import { model, Schema } from 'mongoose';

const playlistSchema = new Schema<IPlayList>(
  {
    name: {
      type: String,
      required: true,
    },
    audios: [
      {
        type: Schema.Types.ObjectId,
        ref: Refs.AUDIO,
        required: true,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: Refs.USER,
    },
    genres: [
      {
        type: Genres,
        required: true,
        enum: Genres,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const testModel: Model<IPlayList> = model(Models.USER, playlistSchema);
