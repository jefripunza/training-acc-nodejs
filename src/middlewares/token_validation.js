const express = require("express");

const { print } = require("../utils/services");

const jwt = require("jsonwebtoken");
const { isBearer } = require("../helpers/validation");
const { skip_token } = require("../consts");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
module.exports = (req, res, next) => {
  let message = "";
  if (skip_token) {
    message = skip_token;
    print(req.traceId, { message });
    return next();
  }
  const token = isBearer(req);
  if (token) {
    return jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      async (err, token_decoded) => {
        if (err) {
          message = "Not Authorized!";
          print(req.traceId, { message });
          return res.status(401).json({
            OUT_STAT: "F",
            OUT_MESS: "invalid_client",
            OUT_DATA: [{ error_description: message }],
          });
        } else {
          req.user = token_decoded; // OK
          print(req.traceId, { json: { token_decoded } });
          return next();
        }
      }
    );
  } else {
    message = "Authorization Bearer is required!";
    print(req.traceId, { message });
    return res.status(403).json({
      OUT_STAT: "F",
      OUT_MESS: "invalid_client",
      OUT_DATA: [{ error_description: message }],
    });
  }
};
