import { BaseError } from "./baseError";

export class NotFoundError extends BaseError {
  constructor(message: string = "Requested resource not found") {
    super(404, message);
  }
}
