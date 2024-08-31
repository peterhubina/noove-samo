import { Response } from "express";

export const ThrowNotFound = (
    res: Response,
    message?: String,
    code?: String
) => {
    res.status(404).send({
        message: message ? message : "Not found",
        code: code ? code : "NOT_FOUND",
    });
};
