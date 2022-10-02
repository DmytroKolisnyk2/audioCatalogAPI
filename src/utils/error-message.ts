import { statusCode } from '@enums';

const DEFAULT_MESSAGE = 'Network Error';

class ErrorMessage extends Error {
  status: statusCode;

  constructor({
    status = statusCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
  }
}

export { ErrorMessage };
