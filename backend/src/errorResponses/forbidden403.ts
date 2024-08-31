import { Response } from "express";

export const ThrowForbidden = (
    res: Response,
    message?: String,
    code?: String
) => {
    res.status(403).send({
        message: message ? message : "You do not have access to this resource",
        code: code ? code : "FORBIDDEN",
    });
};
