const mimeType = require('mime-types');

const fs = require('fs');

const contentType = (file) => {
  return mimeType.lookup(file) || 'text/plain';
};

const serveStaticFile = (serveFrom, aliases) => (request, response, next) => {
  const { pathname } = request.url;
  const filename = aliases[pathname] || pathname;
  try {
    const content = fs.readFileSync(serveFrom + filename);
    response.setHeader('Content-type', contentType(filename) || 'text/plain');
    response.end(content);
  } catch (error) {
    next();
  }
  return true;
};

module.exports = { serveStaticFile };