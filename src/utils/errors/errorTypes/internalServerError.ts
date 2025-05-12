import { HttpError } from "../base/httpError";

export class InternalServerError extends HttpError {
    constructor(message: string = "Erro interno no servidor.") {
        super(message, 500);
    }
};