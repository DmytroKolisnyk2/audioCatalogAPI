import { StatusCode } from '@enums';
import { ErrorMessage } from '@utils';
import type { TFunction } from 'i18next';

class UserExistError extends ErrorMessage {
  constructor(t: TFunction) {
    super({
      status: StatusCode.CONFLICT,
      message: t('auth:validation.userExist'),
    });
  }
}

export { UserExistError };
