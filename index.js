import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./db.js";
import { userRouter } from "./Routers/user.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api", userRouter);

dbConnection();

app.listen(PORT, () => console.log(`server running in localhost:${PORT}`));
