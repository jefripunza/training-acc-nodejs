// 1st Module
const http = require("http");

// Third Party Module
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { isProduction, skip_request } = require("../config");
const random = require("../helpers/random");

// ---------------------------------------------------------------------
// ## Setup App

// Define
const app = express();
const server = http.createServer(app);

// WebSocket (for log)
const { Server } = require("socket.io");
const io = new Server(server);

// Config
app.set("port", process.env.PORT || 8080);

// Middleware
if (!isProduction) app.use(cors());
if (isProduction) app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------------------------------------------------------------------

// Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint Logger
app.use((req, _, next) => {
  if (
    !skip_request.some((v) => String(req.originalUrl).startsWith(v)) &&
    req.originalUrl !== "/"
  ) {
    const traceId = random.Text(8);
    req.traceId = traceId;
    console.log(`[${traceId}][START] : ${req.originalUrl}`);
  }
  return next();
});
app.use(require("../utils/logger")());

// All Router
require("../routers")(app);

// 404 : Page Not Found !!!
app.all("*", (req, res) => {
  if (
    !["get", "post", "patch", "delete"].includes(
      String(req.method).toLowerCase()
    )
  ) {
    return res.status(403).send("forbidden");
  }
  return res.status(404).json({
    message: "endpoint not found!",
  });
});

module.exports = { app, server, io };
