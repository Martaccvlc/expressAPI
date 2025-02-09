import express, { Request, Response } from "express";

import Logger from "./utils/logger";
import morganMiddleware from './config/morganMiddleware'

// Create a new express application instance
const app = express();

// Set the network port
const port = process.env.PORT || 3000;

// Add Morgan middleware
app.use(morganMiddleware)

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
    Logger.info("Success");
});

// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
    Logger.info("Express server is running.");
});