import Joi from 'joi';

export const testSchema = Joi.object({
  message: Joi.string().required().messages({
    'any.required': 'missing field message',
  }),
});
