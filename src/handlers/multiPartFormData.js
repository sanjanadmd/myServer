const parseAttributes = (attributes) => {
  const parsedAttributes = {};
  attributes.forEach(attribute => {
    const [key, value] = attribute.split('=');
    parsedAttributes[key.trim()] = value;
  });

  return parsedAttributes;
};

const parseHeaders = (headerString) => {
  const headers = {};

  headerString.split('\r\n').forEach(line => {
    if (!line) {
      return;
    }
    const rawAttributes = line.split(';');
    const [header, value] = rawAttributes[0].split(':');
    const attributes = parseAttributes(rawAttributes.slice(1));
    headers[header] = { value, attributes };
  });
  return headers;
};

const parseMultipartFormData = (data, boundary) => {
  const firstIndex = data.indexOf(boundary) + boundary.length;
  const lastIndex = data.lastIndexOf(`\r\n--${boundary}`);

  const content = data.slice(firstIndex, lastIndex);
  const contentIndex = content.indexOf('\r\n\r\n');

  const rawHeaders = content.slice(0, contentIndex + 4);
  const headers = parseHeaders(rawHeaders.toString());
  const body = content.slice(contentIndex + 4);
  return { headers, body };
};

module.exports = { parseMultipartFormData };
