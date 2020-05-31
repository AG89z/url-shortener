class HttpError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.status = status;
    this.message = message;
  }
}

export default HttpError;
