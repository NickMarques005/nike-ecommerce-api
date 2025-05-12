import { HttpError } from "../base/httpError";

export class ForbiddenError extends HttpError {
    constructor(message: string = "Acesso proibido.") {
        super(message, 403);
    }
};