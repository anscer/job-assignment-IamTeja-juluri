import dotenv from "dotenv";
dotenv.config();

interface envProperties {
  PORT: string;
  MONGO_URI: string;
  JWT_SECRET: string;
}

const ServerConfig: envProperties = {
  PORT: process.env.PORT || "3000",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/mydb",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};

export default ServerConfig;
