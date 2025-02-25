import mongoose, { Connection } from "mongoose";
import Logger from "../utils/logger";

let client: Connection | null = null;


async function connectToDb(mongodbUri: string) {
    await mongoose.connect(mongodbUri);

    client = mongoose.connection;
    client.on("error", (error: Error) => Logger.error(error));
    client.on("open", () =>
    Logger.info("[database]: Database connection established!")
  );
}

export default connectToDb;