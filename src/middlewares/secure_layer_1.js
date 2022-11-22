const express = require("express");

const { print } = require("../utils/services");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
module.exports = (req, res, next) => {
  const {
    apikey,
    "x-content-type-options": x_content_type_options,
    "x-xss-protection": x_xss_protection,
    "strict-transport-security": strict_transport_security,
    "x-frame-options": x_frame_options,
  } = req.headers;
  if (
    apikey &&
    x_content_type_options &&
    x_xss_protection &&
    strict_transport_security &&
    x_frame_options
  ) {
    req.apikey = apikey;
    return next();
  }
  const message = "You do not have permission to access the API!";
  print(req.traceId, { message });
  return res.status(200).json({
    OUT_STAT: "F",
    OUT_MESS: message,
  });
};
