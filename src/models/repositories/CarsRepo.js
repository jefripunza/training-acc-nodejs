const Model = require("../../utils/models.js");

const Cars = require("../entities/CarsEntity");

// =============================================================

exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Cars, new_data);
};

exports.isIdExist = async (id) => {
  return await Model.isExist(Cars, {
    id,
  });
};

exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Cars, keyword, show, page, desc);
};
exports.search = async (keyword, detail = false) => {
  let query = `SELECT cars.id, cars.create_date, brands.name, cars.model, cars.color, cars.image FROM cars`;
  query += " INNER JOIN brands ON cars.id_brand = brands.id";
  if (keyword) {
    keyword = Model.escape(keyword);
    query += ` WHERE brands.name LIKE '%${keyword}%'`;
    query += ` OR cars.model LIKE '%${keyword}%'`;
    query += ` OR cars.color LIKE '%${keyword}%'`;
  }
  const result = await Model.customQuery(query);
  return result.map((v) => {
    v.image = String(v.image).replace(/ /g, "%20");
    return v;
  });
};

exports.inBrandId = async (ids) => {
  return await Model.in(Cars, "id_brand", ids);
};

exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(Cars, { id }, new_data);
};

exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Cars, { id });
};
