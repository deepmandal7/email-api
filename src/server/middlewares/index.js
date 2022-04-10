const { corsMiddleware } = require("./cors.middleware");
const { morganMiddleware } = require("./morgan.middleware");
const { responseHandlerMiddleware } = require("./responseHandler.middleware");

module.exports = {
  corsMiddleware,
  morganMiddleware,
  responseHandlerMiddleware,
};
