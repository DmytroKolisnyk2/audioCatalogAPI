import type { UpdateProfileDto } from '@types';
import { Languages, Themes } from '@enums';
import type { TFunction } from 'i18next';
import type { Schema } from 'joi';
import Joi from 'joi';

export const profileSchema = (t: TFunction): Schema =>
  Joi.object<UpdateProfileDto>({
    language: Joi.string()
      .valid(...Object.values(Languages))
      .messages({
        'any.only': t('user:validation.profile.languages'),
      }),
    theme: Joi.string()
      .valid(...Object.values(Themes))
      .messages({
        'any.only': t('user:validation.profile.themes'),
      }),
    saveHistory: Joi.boolean(),
  });
