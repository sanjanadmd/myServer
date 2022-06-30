const { myServer } = require('./src/server/myServer.js');
const { createHandler } = require('./src/router.js');
const { serveStaticFile } = require('./src/serveStaticFile.js');

module.exports = {
  myServer,
  createHandler,
  serveStaticFile
};