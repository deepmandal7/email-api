// const https = require("https");
const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const Agenda = require("agenda");

dotenv.config({ path: require("find-config")(".env") });

const configurations = {
  production: { ssl: true, port: process.env.PORT, hostname: "" },
  development: { ssl: false, port: process.env.PORT, hostname: process.env.STAGE_HOSTNAME },
};

const environment = process.env.NODE_ENV || "development";
const config = configurations[environment];

const uri = require("./database");

const { corsMiddleware, morganMiddleware, responseHandlerMiddleware } = require("../server/middlewares");

const api = require("../server/routes/index");

const app = express();

let server = config.ssl ? http.createServer(app) : http.createServer(app);

require("../server/utilities/scheduleHandler")(Agenda);

app.all("/*", corsMiddleware);
app.options("*", cors());
app.use(morganMiddleware);
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(`/${process.env.API_VERSION}`, api);
app.use(responseHandlerMiddleware);

module.exports = { app, server };
