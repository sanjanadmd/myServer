const fs = require("fs");
const path = require("path");

const extensions = {
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.html': 'text/html',
  '.pdf': 'application/pdf'
};

const contentType = (file) => {
  const extension = path.extname(file);
  return extensions[extension];
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