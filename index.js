const { startServer } = require('./src/server/myServer.js');
const { createHandler } = require('./src/server/router.js');
const { bodyParser } = require('./src/handlers/bodyParser.js');
const { notFoundHandler } = require('./src/handlers/notFound.js');
const { serveStaticFile } = require('./src/handlers/serveStaticFile.js');

module.exports = {
  startServer,
  createHandler,
  bodyParser,
  serveStaticFile,
  notFoundHandler
};