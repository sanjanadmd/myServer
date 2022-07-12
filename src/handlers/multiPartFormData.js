const CRLF = '\r\n';

const lowercase = value => value.trim().toLowerCase();

const parseAttributes = (attributes) => {
  const parsedAttributes = {};

  attributes.forEach(attribute => {
    const [key, value] = attribute.split('=');
    parsedAttributes[lowercase(key)] = value;
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

    const [header, value] = rawHeader.split(':');
    const attributes = parseAttributes(rawAttributes);

    headers[lowercase(header)] = { value, attributes };
  });

  return headers;
};

const parseMultipartFormData = (data, boundary) => {

  const boundaryStart = data.indexOf(boundary) + boundary.length;
  const boundaryEnd = data.lastIndexOf(`${CRLF}--${boundary}`);

  const content = data.slice(boundaryStart, boundaryEnd);
  const contentIndex = content.indexOf(CRLF.repeat(2));

  const rawHeaders = content.slice(0, contentIndex + 4);
  const body = content.slice(contentIndex + 4);

  const headers = parseHeaders(rawHeaders.toString());

  return { headers, body };
};

module.exports = { parseMultipartFormData };
