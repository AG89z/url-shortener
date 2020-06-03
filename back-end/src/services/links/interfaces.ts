import { Link } from "../../entities/links";

export interface LinkResource extends Link {
  password: undefined;
  protected: boolean;
}

export interface SoftError {
  type: string;
  message: string;
}

export function isError(obj: unknown): obj is SoftError {
  return (
    (<SoftError>obj).type !== undefined &&
    (<SoftError>obj).message !== undefined
  );
}
