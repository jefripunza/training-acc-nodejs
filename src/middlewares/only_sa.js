const express = require("express");

const { print } = require("../utils/services");
const { privilege } = require("../consts");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
module.exports = (req, res, next) => {
  let message = "";
  if ([privilege.sa].includes(req.user.privilege)) {
    return next();
  }
  message = "Only Super Admin !!!";
  print(req.traceId, { message });
  return res.status(401).json({
    message,
  });
};
