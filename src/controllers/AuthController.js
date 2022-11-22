const AuthService = require("../services/AuthService");

exports.login = async (req, res) => {
  const { code, message, render } = await AuthService.login(
    req.traceId,
    req.basic_auth
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
exports.loginGT = async (req, res) => {
  const { code, message, render } = await AuthService.loginGT(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.refreshToken = async (req, res) => {
  const { code, message, render } = await AuthService.refreshToken(
    req.traceId,
    req.headers
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
