function makeError(
  error: string,
  message: string
): { error: string; message: string } {
  return {
    error,
    message,
  };
}

export = makeError;
