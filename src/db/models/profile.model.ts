import { Models } from '@enums';
import type { IProfile } from '@types';
import type { Model } from 'mongoose';
import { model, Schema } from 'mongoose';

const profileSchema = new Schema<IProfile>(
  {
    username: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: 'User',
    },
    language: {
      type: String,
      enum: ['en', 'uk'],
      default: 'en',
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    genres: [
      {
        type: String,
        required: true,
        enum: '',
      },
    ],
    saveHistory: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const testModel: Model<IProfile> = model(Models.USER, profileSchema);
