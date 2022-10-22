import { AudioConfig } from '@constants';
import { Genres } from '@enums';
import type { IAudio } from '@types';
import type { TFunction } from 'i18next';
import type { Schema } from 'joi';
import Joi from 'joi';

export const audioSchema = (t: TFunction): Schema =>
  Joi.object<IAudio>({
    name: Joi.string()
      .required()
      .min(AudioConfig.NAME_MIN_LENGTH)
      .max(AudioConfig.NAME_MAX_LENGTH)
      .messages({
        'string.min': t('audio:validation.shortName'),
        'string.max': t('audio:validation.longName'),
        'any.required': t('audio:validation.nameRequired'),
      }),
    duration: Joi.number().required().min(0),
    genres: Joi.array()
      .items(Joi.string().valid(...Object.values(Genres)))
      .required(),
  });
