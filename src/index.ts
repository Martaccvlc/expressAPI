import express, { Request, Response } from "express";

import Logger from "./utils/logger";
import morganMiddleware from './config/morganMiddleware'
import connectToMongoDB  from "./config/database_conn";
import route from "./routes/route";

const MONGODB_URI = process.env.MONGODB_URI as string;

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

// Register API routes from the projectRoutes array
app.use('/api', route);

connectToMongoDB(MONGODB_URI)
.then(() => {
  app.listen(port, () => {
    Logger.info(`[server]: Server is running at http://localhost:${port}`);
  });
})
.catch((error) => {
  Logger.error('Failed to connect to MongoDB database:', error);
  process.exit(1);
})

export default app;