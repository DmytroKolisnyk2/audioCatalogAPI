import  { Models, Refs } from '@enums';
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
      enum: JSON.parse(Refs.LANGUAGES),
      default: 'ua',
    },
    theme: {
      type: String,
      enum: JSON.parse(Refs.THEMES),
      default: 'light',
    },
    avatarUrl: {
      type: String,
      required: false,
      default: '#',
    },
    banner: {
      type: String,
      required: false,
      default: '#',
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
