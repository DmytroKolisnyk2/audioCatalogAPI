import { StatusCode } from '@enums';
import { ErrorMessage } from '@utils';
import type { TFunction } from 'i18next';

class AudioNotFoundError extends ErrorMessage {
  constructor(t: TFunction) {
    super({
      status: StatusCode.NOT_FOUND,
      message: t('audio:validation.notFound'),
    });
  }
}

export { AudioNotFoundError };
