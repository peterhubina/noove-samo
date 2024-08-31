import { Response } from "express";

export const ThrowBadRequest = (
    res: Response,
    message?: String,
    code?: String
) => {
    res.status(400).send({
        message: message ? message : "Bad request",
        code: code ? code : "BAD_REQUEST",
    });
};
