const Model = require("../../utils/models.js");

const Users = require("../entities/UsersEntity");

// =============================================================

exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Users, new_data);
};

exports.isExist = async (selector) => {
  return await Model.isExist(Users, selector);
};
exports.isUsernameExist = async (username) => {
  return await Model.isExist(Users, {
    username,
  });
};
exports.isIdExist = async (id) => {
  return await Model.isExist(Users, {
    id,
  });
};
exports.isLogin = async (username, password) => {
  const result = await Model.isExist(Users, { username, password });
  return result
    ? {
        id: result.id,
      }
    : false;
};

exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Users, keyword, show, page, desc);
};

exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(Users, { id }, new_data);
};

exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Users, { id });
};
