import { Link } from "../link";

export interface LinkResource extends Link {
  password: undefined;
  protected: boolean;
}
