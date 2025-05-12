import { HttpError } from "../base/httpError";

export class UnauthorizedError extends HttpError {
    constructor(message: string = "Não autorizado.") {
        super(message, 401);
    }
};