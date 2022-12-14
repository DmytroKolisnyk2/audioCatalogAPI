import { Refs } from '@enums';
import type { IUser } from '@types';
import { model, Schema } from 'mongoose';

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: Refs.USER,
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: Refs.USER,
      },
    ],
    likedAudios: [
      {
        type: Schema.Types.ObjectId,
        ref: Refs.AUDIO,
      },
    ],
    createdAudios: [
      {
        type: Schema.Types.ObjectId,
        ref: Refs.AUDIO,
      },
    ],
    profile: {
      type: Schema.Types.ObjectId,
      ref: Refs.PROFILE,
    },
    playlist: [
      {
        type: Schema.Types.ObjectId,
        ref: Refs.PLAYLIST,
      },
    ],
    role: String,
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: Refs.AUDIO,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const userModel = model<IUser>(Refs.USER, userSchema);
