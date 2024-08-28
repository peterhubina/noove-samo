import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ThrowBadRequest } from "../../errorResponses/badRequest400";
import { ThrowConflict } from "../../errorResponses/conflict409";
import { ThrowUnauthorized } from "../../errorResponses/unauthorized401";

const prisma = new PrismaClient();
const router = express.Router();

// Sign-Up Route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return ThrowBadRequest(res);
    }

    const existingUser = await prisma.company.findUnique({
        where: { email },
    });
    if (existingUser) {
        return ThrowConflict(res, "Email already in use", "EMAIL_IN_USE");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.company.create({
        data: {
            name,
            email,
            password: hashedPassword,
            logoUrl: null,
        },
    });

    const token = jwt.sign(
        {
            id: newUser.id,
            email: newUser.email,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d",
        }
    );

    res.status(201).json({
        message: "User created successfully",
        token: token,
        user: {
            companyName: newUser.name,
            email: newUser.email,
        },
    });
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return ThrowUnauthorized(
            res,
            "Invalid credentials",
            "INVALID_CREDENTIALS"
        );
    }

    const user = await prisma.company.findUnique({ where: { email } });
    if (!user) {
        return ThrowUnauthorized(
            res,
            "Invalid credentials",
            "INVALID_CREDENTIALS"
        );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return ThrowUnauthorized(
            res,
            "Invalid credentials",
            "INVALID_CREDENTIALS"
        );
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d",
        }
    );

    res.status(200).send({
        message: "Login successful",
        token: token,
        user: {
            companyName: user.name,
            email: user.email,
        },
    });
});

// Password Reset Route
router.put("/passwordReset", async (req, res) => {});

export default router;
