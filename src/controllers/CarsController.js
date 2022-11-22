const CarsService = require("../services/CarsService");

exports.searchCar = async (req, res) => {
  const { code, message, render } = await CarsService.search(
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
