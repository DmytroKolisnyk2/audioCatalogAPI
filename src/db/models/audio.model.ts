import { AudioConfig } from '@constants';
import { Models, Refs } from '@enums';
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
      default: AudioConfig.audioCoverUrl,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: Refs.USER,
    },
    usersLiked: [
      {
        type: Schema.Types.ObjectId,
        ref: Refs.USER,
      },
    ],
    listenCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    playlists: [{ type: Schema.Types.ObjectId, ref: Refs.PLAYLIST }],
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
