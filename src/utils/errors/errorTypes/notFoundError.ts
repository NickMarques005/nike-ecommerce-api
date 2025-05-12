import { HttpError } from "../base/httpError";

export class NotFoundError extends HttpError {
    constructor(message: string = "Recurso não encontrado.") {
        super(message, 404);
    }
};