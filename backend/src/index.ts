import express, {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

import authRoutes from "./endpoints/auth/auth";
import authMiddleware from "./middleware/auth";
import analyzeRouter from "./endpoints/analyze.js";
import { editAccount } from "./endpoints/user/editAccount";
import path from "path";
import {download} from "./endpoints/download";

const morgan = require("morgan");
const cors = require("cors");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
    res.json({ response: "Hello World!" });
});

app.use("/upload", analyzeRouter);

app.use("/auth", authRoutes);

app.use("/user", authMiddleware);
app.put("/user/editAccount", editAccount);

app.get("/companies", authMiddleware, async (req, res) => {
    const users = await prisma.company.findMany();
    res.json(users);
});

app.get('/download-configuration', download);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
