import { ProfileConfig } from '@constants';
import { Languages, Themes, Refs, Genres } from '@enums';
import type { IProfile } from '@types';
import type { Model } from 'mongoose';
import { model, Schema } from 'mongoose';

const profileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: Refs.USER,
    },
    language: {
      type: String,
      enum: [Languages.EN, Languages.UA],
      default: ProfileConfig.language,
    },
    theme: {
      type: String,
      enum: [Themes.DARK, Themes.LIGHT],
      default: ProfileConfig.theme,
    },
    avatarUrl: {
      type: String,
      required: false,
      default: ProfileConfig.imageUrl,
    },
    banner: {
      type: String,
      required: false,
      default: ProfileConfig.bannerUrl,
    },
    genres: [
      {
        type: String,
        required: false,
        enum: Genres,
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

export const profileModel: Model<IProfile> = model(Refs.PROFILE, profileSchema);
