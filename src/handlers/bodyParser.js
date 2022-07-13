const { parseMultipartFormData } = require('./multiPartFormData.js');

const getBoundary = (header) => header?.split('=')[1];

const parseContentType = (header) => {
  if (!header) {
    return {};
  }
  const headers = header.split(';');
  const contentType = headers[0];
  const boundary = getBoundary(headers[1]);
  return { contentType, boundary };
};

const injectBodyParams = (request, response, next) => {
  const { contentType, boundary } = parseContentType(request.headers['content-type']);

  if (contentType === 'multipart/form-data') {
    const buffer = Buffer.concat(request.rawBody);
    request.bodyParams = parseMultipartFormData(buffer, boundary);
    next();
    return;
  }

  request.bodyParams = new URLSearchParams(request.rawBody.join(''));
  next();
};

const bodyParser = (request, response, next) => {
  const params = [];
  request.on('data', (chunk) => {
    params.push(chunk);
  });

  request.on('end', () => {
    request.rawBody = params;
    injectBodyParams(request, response, next);
    return;
  });
};

module.exports = { bodyParser };