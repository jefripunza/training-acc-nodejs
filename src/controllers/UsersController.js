const UsersService = require("../services/UsersService");

exports.createUser = async (req, res) => {
  const { code, message, render } = await UsersService.insert(
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

exports.readUserPagination = async (req, res) => {
  const { code, message, render } = await UsersService.pagination(
    req.traceId,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.updateUser = async (req, res) => {
  const { code, message, render } = await UsersService.update(
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

exports.deleteUser = async (req, res) => {
  const { code, message, render } = await UsersService.delete(
    req.traceId,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
