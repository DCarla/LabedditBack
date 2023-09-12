import { BaseError } from "./baseError";

export class UnauthorizedError extends BaseError {
  constructor(message: string = "Invalid token") {
    super(401, message);
  }
}
