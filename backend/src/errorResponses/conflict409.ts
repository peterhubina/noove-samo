import { Response } from "express";

export const ThrowConflict = (
    res: Response,
    message?: String,
    code?: String
) => {
    res.status(409).send({
        message: message ? message : "Conflict",
        code: code ? code : "CONFLICT",
    });
};
