import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
import fs from "fs";
dotenv.config({ path: "./.env" });

const sslConfig = {
  rejectUnauthorized: false, // Set to true if you want to check the server's cert against your CA
  ca: fs.readFileSync("/usr/src/app/us-east-2-bundle.pem").toString(),
};

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: sslConfig,
});

export default pool;
