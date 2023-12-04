import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware";
import AuthRoutes from "./routes/AuthRoutes";

const app: Application = express();

dotenv.config();

connectDB();

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: "*",
}));

// Default
app.get("/api", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Auth ts" });
});

// User Route
app.use("/api/auth", AuthRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));
