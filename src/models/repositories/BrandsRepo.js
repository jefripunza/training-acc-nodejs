const Model = require("../../utils/models.js");

const Brands = require("../entities/BrandsEntity");

// =============================================================

exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Brands, new_data);
};

exports.isIdExist = async (id) => {
  return await Model.isExist(Brands, {
    id,
  });
};

exports.showAll = async () => {
  return await Model.selectFrom(Brands);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Brands, keyword, show, page, desc);
};
exports.search = async (keyword, detail = false) => {
  let query = `SELECT id, name FROM brands`;
  if (keyword) {
    keyword = Model.escape(keyword);
    query += ` WHERE name LIKE '%${keyword}%'`;
  }
  const result = await Model.customQuery(query);
  if (detail) {
    return result.map((v) => {
      return {
        id: v.id,
        brand: v.name,
      };
    });
  }
  return result.map((v) => v.name);
};

exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(Brands, { id }, new_data);
};

exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Brands, { id });
};
