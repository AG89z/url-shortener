export type SoftError = {
  type: string;
  message: string;
};

export function isError(obj: unknown): obj is SoftError {
  return (<SoftError>obj).message !== undefined;
}
