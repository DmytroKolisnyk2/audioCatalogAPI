import { StatusCode } from '@enums';
import { ErrorMessage } from '@utils';
import type { TFunction } from 'i18next';

class Unauthorized extends ErrorMessage {
  constructor(t: TFunction) {
    super({
      status: StatusCode.UNAUTHORIZED,
      message: t('auth:validation.Unauthorized'),
    });
  }
}

export { Unauthorized };
