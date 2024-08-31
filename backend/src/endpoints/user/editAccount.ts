import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ThrowBadRequest } from "../../errorResponses/badRequest400";
import { TokenDecodedData } from "../../../@types/jwtToken";
import { ThrowInternalServerError } from "../../errorResponses/internalServer500";
import { ThrowUnauthorized } from "../../errorResponses/unauthorized401";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const editAccount = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return ThrowBadRequest(res);
    }

    const userData = req.user as TokenDecodedData;
    const user = await prisma.company.findUnique({
        where: { id: userData.id },
    });

    if (!user) {
        return ThrowBadRequest(res);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return ThrowUnauthorized(
            res,
            "Invalid credentials",
            "INVALID_CREDENTIALS"
        );
    }

    try {
        await prisma.company.update({
            where: {
                id: user.id,
            },
            data: {
                name: name,
                email: email,
            },
        });

        return res.status(200).send({
            message: "Account updated successfully",
            user: {
                companyName: name,
                email: email,
            },
        });
    } catch (e) {
        return ThrowInternalServerError(res);
    }
};
