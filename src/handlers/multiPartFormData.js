const CRLF = '\r\n';

const lowercase = value => value.trim().toLowerCase();
const formatValue = (value) => value.trim().replaceAll('"', '');

const parseAttributes = (attributes) => {
  const parsedAttributes = {};

  attributes.forEach(attribute => {
    const [key, value] = attribute.split('=');
    parsedAttributes[lowercase(key)] = formatValue(value);
  });

  return parsedAttributes;
};

const parseHeaders = (headerString) => {
  const headers = {};

  headerString.split(CRLF).forEach(line => {
    if (!line) {
      return;
    }
    const [rawHeader, ...rawAttributes] = line.split(';');

    const [header, headerValue] = rawHeader.split(':');
    const attributes = parseAttributes(rawAttributes);

    headers[lowercase(header)] = { value: headerValue?.trim(), attributes };
  });

  return headers;
};

const parseMultipartFormData = (data, boundary) => {
  const params = [];
  let boundaryStart = 1;

  let content = data;
  while (boundaryStart > 0) {
    boundaryStart = content.indexOf(boundary);
    const nextBoundary = content.slice(boundaryStart).indexOf(`${CRLF}--${boundary}`) + boundaryStart;

    const actualContent = content.slice(boundaryStart + boundary.length, nextBoundary);
    content = content.slice(nextBoundary + 1);
    const contentIndex = actualContent.indexOf(CRLF.repeat(2));

    const rawHeaders = actualContent.slice(0, contentIndex + 4);
    const body = actualContent.slice(contentIndex + 4);

    const headers = parseHeaders(rawHeaders.toString());
    params.push({ headers, body });
  }

  return params;
};

module.exports = { parseMultipartFormData };
