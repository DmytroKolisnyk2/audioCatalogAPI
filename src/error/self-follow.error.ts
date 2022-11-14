import { StatusCode } from '@enums';
import { ErrorMessage } from '@utils';
import type { TFunction } from 'i18next';

class SelfFollowError extends ErrorMessage {
  constructor(t: TFunction) {
    super({
      status: StatusCode.BAD_REQUEST,
      message: t('user:validation.selfFollow'),
    });
  }
}

export { SelfFollowError };
