import { Models } from '@enums';
import type { IUser } from '@types';
import type { Model } from 'mongoose';
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
        ref: '',
      },
    ],
    likedAudios: [
      {
        type: Schema.Types.ObjectId,
        ref: '',
      },
    ],
    createdAudios: [
      {
        type: Schema.Types.ObjectId,
        ref: '',
      },
    ],
    profile: {
      type: Schema.Types.ObjectId,
    },
    playlist: [
      {
        type: Schema.Types.ObjectId,
        ref: '',
      },
    ],
    role: String,
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: '',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const testModel: Model<IUser> = model(Models.USER, userSchema);
