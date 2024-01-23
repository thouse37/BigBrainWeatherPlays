import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

export default pool;
