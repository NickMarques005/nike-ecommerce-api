import { HttpError } from "../base/httpError";

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(message, 400);
    }
};