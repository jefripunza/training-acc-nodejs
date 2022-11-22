const path = require("path");

// Setup Environment
require("dotenv").config();

// -----------------------------------------------------------------------------
//-> System

exports.isCompiled = ["index.js", "app.js"].some((root) =>
  String(__filename).endsWith(root)
);
exports.isProduction = String(process.env.NODE_ENV).includes("production");

exports.project_root =
  process.env.PWD || // Docker
  process.env.INIT_CWD || // Cloud
  process.env.LSNODE_ROOT || // Hosting
  path.join(__dirname, ".."); // local

exports.skip_request = ["/favicon.ico", "/log"];

// -----------------------------------------------------------------------------
//-> Database Env

exports.endpoint = process.env.ENDPOINT;
exports.db_config = {
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "acc",
};
exports.synchronize = process.env.DB_SYNC === "true";
exports.logging = process.env.DB_LOG === "true";
