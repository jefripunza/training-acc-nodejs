const { print } = require("../utils/services");
const { api_key_length } = require("../consts");

const random = require("../helpers/random");

const UsersRepo = require("../models/repositories/UsersRepo");
const encryption = require("../utils/encryption");

exports.insert = async (traceId, { name, username, password }) => {
  let message = "";
  try {
    // check apakah variabel berikut ada (wajib)
    if (!(name && username && password)) {
      message = "body (name, username, password) require!";
      print(traceId, { message });
      return {
        code: 400,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }

    // check apakah username sudah ada di database
    const isExist = await UsersRepo.isUsernameExist(username);
    if (isExist) {
      message = `username "${username}" sudah ada`;
      print(traceId, { message });
      return {
        code: 400,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }

    // input data user baru
    await UsersRepo.insertNew({
      name,
      username,
      password: encryption.encode(password),
      api_key: random.Text(api_key_length),
    });

    // render
    message = "berhasil menambahkan user baru";
    print(traceId, { message });
    return {
      code: 200,
      render: {
        OUT_STAT: "T",
        OUT_MESS: "Success",
        OUT_DATA: [{ error_description: message }],
      },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user > insert", message });
    return {
      code: 500,
      render: {
        OUT_STAT: "F",
        OUT_MESS: "internal_server_error",
        OUT_DATA: [{ error_description: message }],
      },
    };
  }
};

exports.pagination = async (traceId, { show, page, orderby, keyword }) => {
  let message = "";
  try {
    // pemetaan pagination
    const result = await UsersRepo.showPagination(
      show,
      page,
      ["'", '"'].includes(keyword)
        ? undefined
        : {
            name: keyword,
            username: keyword,
          },
      String(orderby).toLowerCase() === "desc"
    );

    // render
    return {
      code: 200,
      render: result,
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user > pagination", message });
    return {
      code: 500,
      render: {
        OUT_STAT: "F",
        OUT_MESS: "internal_server_error",
        OUT_DATA: [{ error_description: message }],
      },
    };
  }
};

exports.update = async (
  traceId,
  {
    id, // selector
    name,
    username,
    password,
  }
) => {
  let message = "";
  try {
    // id (selector) wajib
    if (!id) {
      message = "id dibutuhkan di body";
      print(traceId, { message });
      return {
        code: 400,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }

    // check apakah ada yang ingin dirubah
    if (!(name || username || password)) {
      message = "wajib mengisi salah satu body (name, username, password)";
      print(traceId, { message });
      return {
        code: 400,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }

    // check apakah data yang ingin di update sekarang ini ada di database
    const isExist = await UsersRepo.isIdExist(id);
    if (!isExist) {
      message = `user_id "${id}" tidak ada`;
      print(traceId, { message });
      return {
        code: 400,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }

    // update data
    const { affected } = await UsersRepo.updateWhereId(id, {
      name,
      username,
      password: password ? encryption.encode(password) : undefined,
    });

    // apakah benar2 mengupdate data
    if (affected === 0) {
      message = "user tidak terupdate";
      print(traceId, { message });
      return {
        code: 500,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }

    // render
    message = "berhasil merubah data user";
    print(traceId, { message });
    return {
      code: 200,
      render: {
        OUT_STAT: "F",
        OUT_MESS: "invalid_client",
        OUT_DATA: [{ error_description: message }],
      },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user > update", message });
    return {
      code: 500,
      render: {
        OUT_STAT: "F",
        OUT_MESS: "internal_server_error",
        OUT_DATA: [{ error_description: message }],
      },
    };
  }
};

exports.delete = async (traceId, { id }) => {
  let message = "";
  try {
    // check apakah data yang ingin di delete sekarang ini ada di database
    const isExist = await UsersRepo.isIdExist(id);
    if (!isExist) {
      message = `user "${id}" tidak ada`;
      print(traceId, { message });
      return {
        code: 400,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }

    // delete data
    await UsersRepo.deleteWhereId(id);

    // render
    message = "berhasil menghapus data user";
    print(traceId, { message });
    return {
      code: 200,
      render: {
        OUT_STAT: "F",
        OUT_MESS: "invalid_client",
        OUT_DATA: [{ error_description: message }],
      },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "user > delete", message });
    return {
      code: 500,
      render: {
        OUT_STAT: "F",
        OUT_MESS: "internal_server_error",
        OUT_DATA: [{ error_description: message }],
      },
    };
  }
};
