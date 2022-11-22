const express = require("express");

const { print } = require("../utils/services");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
module.exports = (req, res, next) => {
  let message = "";
  if (!req.headers?.authorization) {
    message = "Authorization Basic is required!";
    print(req.traceId, { message });
    return res.status(403).json({
      OUT_STAT: "F",
      OUT_MESS: "invalid_client",
      OUT_DATA: [{ error_description: message }],
    });
  }

  // parse username and password from headers
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [username, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  req.basic_auth = { username, password };
  return next();
};
