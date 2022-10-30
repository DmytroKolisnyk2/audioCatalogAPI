import { StatusCode } from '@enums';
import { ErrorMessage } from '@utils';
import type { TFunction } from 'i18next';

class ForbiddenAccessError extends ErrorMessage {
  constructor(t: TFunction) {
    super({
      status: StatusCode.FORBIDDEN,
      message: t('auth:validation.forbiddenAccess'),
    });
  }
}

export { ForbiddenAccessError };
