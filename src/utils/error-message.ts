import { StatusCode } from '@enums';

const DEFAULT_MESSAGE = 'Network Error';

class ErrorMessage extends Error {
  status: StatusCode;

  constructor({
    status = StatusCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
  }
}

export { ErrorMessage };
