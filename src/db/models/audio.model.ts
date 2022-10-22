import { AudioConfig } from '@constants';
import { Genres, Refs } from '@enums';
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
      required: true,
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
    duration: {
      type: Number,
      min: 0,
      required: true,
    },
    playlists: [{ type: Schema.Types.ObjectId, ref: Refs.PLAYLIST }],
    genres: [
      {
        type: String,
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

export const audioModel: Model<IAudio> = model(Refs.AUDIO, audioSchema);
