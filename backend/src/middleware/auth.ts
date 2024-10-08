import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ThrowUnauthorized } from "../errorResponses/unauthorized401";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return ThrowUnauthorized(
            res,
            "Access denied, no token provided",
            "MISSING_TOKEN"
        );
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string);
        next();
    } catch (e) {
        return ThrowUnauthorized(res, "Invalid token", "INVALID_TOKEN");
    }
};

export default authMiddleware;
