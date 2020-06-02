import { Link } from "../models/link";

export interface LinkResource extends Link {
  password: undefined;
  protected: boolean;
}
