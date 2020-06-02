import { Link } from "../../entities/links";

export interface LinkResource extends Link {
  password: undefined;
  protected: boolean;
}
