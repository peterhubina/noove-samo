import { Response } from "express";

export const ThrowInternalServerError = (
    res: Response,
    message?: String,
    code?: String
) => {
    res.status(500).json({
        message: message
            ? message
            : "That's not your fault, we are working on repair.",
        code: code ? code : "SERVER_ERROR",
    });
};
