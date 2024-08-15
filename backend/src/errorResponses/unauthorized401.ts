import { Response } from "express";

export const ThrowUnauthorized = (
    res: Response,
    message?: String,
    code?: String
) => {
    res.status(401).send({
        message: message ? message : "Unauthorized",
        code: code ? code : "UNAUTHORIZED",
    });
};
