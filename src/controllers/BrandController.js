const BrandService = require("../services/BrandService");

exports.searchBrand = async (req, res) => {
  const { code, message, render } = await BrandService.search(
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
