import { AuthValidateConfig } from '@constants';
import type { IUser } from '@types';
import type { TFunction } from 'i18next';
import type { Schema } from 'joi';
import Joi from 'joi';

export const authSchema = (t: TFunction): Schema =>
  Joi.object<IUser>({
    username: Joi.string()
      .required()
      .min(AuthValidateConfig.MIN_USERNAME_LENGTH)
      .max(AuthValidateConfig.MAX_USERNAME_LENGTH)
      .messages({
        'string.min': t('auth:validation.shortUsername'),
        'string.max': t('auth:validation.longUsername'),
        'any.required': t('auth:validation.usernameRequired'),
      }),
    password: Joi.string()
      .required()
      .min(AuthValidateConfig.MIN_PASSWORD_LENGTH)
      .max(AuthValidateConfig.MAX_PASSWORD_LENGTH)
      .messages({
        'string.min': t('auth:validation.shortPassword'),
        'string.max': t('auth:validation.longPassword'),
        'any.required': t('auth:validation.passwordRequired'),
      })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z~!@#$%^*\-_=+[{\]}/;:,.?]+$/,
      ),
  });
