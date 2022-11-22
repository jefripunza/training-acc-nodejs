const express = require("express");

const { print } = require("../utils/services");

const UsersRepo = require("../models/repositories/UsersRepo");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
module.exports = async (req, res, next) => {
  let message = "";
  if (!req.headers.apikey) {
    message = "API Key Require!";
    print(req.traceId, { message });
    return res.status(401).json({
      OUT_STAT: "F",
      OUT_MESS: "invalid_client",
      OUT_DATA: [{ error_description: message }],
    });
  }

  const isExist = await UsersRepo.isExist({
    id: req.user.id,
    api_key: req.headers.apikey,
  });
  if (!isExist) {
    message = "API Key is wrong!";
    print(req.traceId, { message });
    return res.status(401).json({
      OUT_STAT: "F",
      OUT_MESS: "invalid_client",
      OUT_DATA: [{ error_description: message }],
    });
  }

  print(req.traceId, { json: { api_key: req.headers.apikey } });
  return next();
};
