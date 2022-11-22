exports.isArray = (value) => {
  return value && typeof value === "object" && Array.isArray(value);
};

exports.isObject = (value) => {
  return value && typeof value === "object" && !Array.isArray(value);
};

exports.isUndefined = (value) => {
  return typeof value === "undefined";
};

exports.validateBearer = (value) => {
  return value !== undefined && String(value).startsWith("Bearer ")
    ? String(value).split(" ")[1]
    : false;
};
exports.isBearer = (req) => {
  return (
    this.validateBearer(req.headers.authentication) ||
    this.validateBearer(req.headers.authorization) ||
    this.validateBearer(req.headers["x-access-token"]) ||
    this.validateBearer(req.body.token) ||
    this.validateBearer(req.query.token)
  );
};

exports.isEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

exports.isAlphanumeric = (value) => {
  const test = String(value).replace(/[^a-zA-Z0-9 ]/gi, "");
  return value.length === test.length;
};
