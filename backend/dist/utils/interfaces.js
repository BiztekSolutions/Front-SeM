"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(status = 500, msg) {
        super();
        this.name = 'CustomError';
        this.message = msg;
        this.status = status;
    }
}
exports.CustomError = CustomError;
