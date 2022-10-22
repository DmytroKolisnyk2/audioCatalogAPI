import { StatusCode } from '@enums';
import { ErrorMessage } from '@utils';
import type { TFunction } from 'i18next';

class GenresError extends ErrorMessage {
  constructor(t: TFunction) {
    super({
      status: StatusCode.UNAUTHORIZED,
      message: t('audio:validation.genresFormat'),
    });
  }
}

export { GenresError };
