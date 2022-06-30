const { startServer } = require('./src/server/myServer.js');
const { createHandler } = require('./src/server/router.js');
const { serveStaticFile } = require('./src/handlers/serveStaticFile.js');

module.exports = {
  startServer,
  createHandler,
  serveStaticFile
};