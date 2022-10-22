import { StatusCode } from '@enums';
import { ErrorMessage } from '@utils';
import type { TFunction } from 'i18next';

class WrongImageFormatError extends ErrorMessage {
  constructor(t: TFunction) {
    super({
      status: StatusCode.BAD_REQUEST,
      message: t('auth:validation.userExist'),
    });
  }
}

export { WrongImageFormatError };
