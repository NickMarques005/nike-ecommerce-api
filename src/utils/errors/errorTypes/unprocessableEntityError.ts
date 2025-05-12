import { HttpError } from "../base/httpError";

export class UnprocessableEntityError extends HttpError {
    constructor(message: string) {
        super(message, 422);
    }
};