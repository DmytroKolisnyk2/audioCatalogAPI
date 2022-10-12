import { StatusCode } from '@enums';
import { ErrorMessage } from '@utils';
import type { TFunction } from 'i18next';

class InValidPassword extends ErrorMessage {
  constructor(t: TFunction) {
    super({
      status: StatusCode.CONFLICT,
      message: t('auth:validation.invalidPassword'),
    });
  }
}

export { InValidPassword };
