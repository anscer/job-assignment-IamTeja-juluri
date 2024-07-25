import express, { Application } from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";
import { Logger, ServerConfig } from "./config";
import apiRoutes from "./routes"
const app: Application = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "*",
  })
);
app.use(cookieParser());

app.use("/api", apiRoutes);

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(ServerConfig.MONGO_URI);
    app.listen(ServerConfig.PORT, async () => {
      Logger.info(`Server running on port ${ServerConfig.PORT}`)
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
