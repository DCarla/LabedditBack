import { BaseError } from "./baseError";

export class ForbiddenError extends BaseError {
  constructor(
    message: string = "Access Denied You don`t have permission to access"
  ) {
    super(403, message);
  }
}
