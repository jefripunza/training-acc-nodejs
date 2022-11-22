const { print } = require("../utils/services");

const UsersRepo = require("../models/repositories/UsersRepo");

const jwt = require("jsonwebtoken");
const jsonwebtoken = require("../utils/jsonwebtoken");
const encryption = require("../utils/encryption");

const { expired_token } = require("../consts");
const { validateBearer } = require("../helpers/validation");

// ----------------------------------------------------------------

exports.login = async (traceId, { username, password }) => {
  let message = "";
  try {
    if (!(username && password)) {
      message = "Basic Auth (username, password) require!";
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

    // validasi apakah username dan password benar
    const isExist = await UsersRepo.isLogin(
      username,
      encryption.encode(password)
    );
    if (!isExist) {
      message = "username / password wrong!";
      print(traceId, { message });
      return {
        code: 401,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }

    // buatkan token
    const access_token = jsonwebtoken.createToken(isExist, expired_token);
    print(traceId, { json: { expired_token, access_token } });

    // render
    return {
      code: 200,
      render: {
        OUT_STAT: "T",
        OUT_MESS: "Success",
        OUT_DATA: [
          {
            access_token,
            token_type: "Bearer",
            expired_token: 1000 * expired_token, // ms
          },
        ],
      },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "auth > login", message });
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
exports.loginGT = async (traceId, { grant_type }) => {
  let message = "";
  try {
    if (!grant_type) {
      message = "grant_type require!";
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
    // validasi apakah username dan password benar
    const isExist = await UsersRepo.isUsernameExist(grant_type);
    if (!isExist) {
      message = "grant_type not found!";
      print(traceId, { message });
      return {
        code: 401,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }

    // buatkan token
    const access_token = jsonwebtoken.createToken(isExist, expired_token);
    print(traceId, { json: { expired_token, access_token } });

    // render
    return {
      code: 200,
      render: {
        OUT_STAT: "T",
        OUT_MESS: "Success",
        OUT_DATA: [
          {
            access_token,
            token_type: "Bearer",
            expired_token: 1000 * expired_token, // ms
          },
        ],
      },
    };
  } catch (error) {
    message = error.message;
    print(traceId, { error: "auth > loginGT", message });
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

exports.refreshToken = async (traceId, { authorization }) => {
  let message = "";
  try {
    if (authorization) {
      const token = validateBearer(authorization);
      return jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decode) => {
        if (error) {
          console.log({ di: "refreshToken", error });
          message = "Not Authorized!";
          print(traceId, { message });
          return {
            code: 401,
            render: {
              OUT_STAT: "F",
              OUT_MESS: "invalid_client",
              OUT_DATA: [{ error_description: message }],
            },
          };
        } else {
          // buatkan token
          const access_token = jsonwebtoken.createToken(
            { id: decode.id },
            expired_token
          );
          print(traceId, { json: { expired_token, access_token } });

          // render
          return {
            code: 200,
            render: {
              OUT_STAT: "T",
              OUT_MESS: "Success",
              OUT_DATA: [
                {
                  access_token,
                  token_type: "Bearer",
                  expired_token: 1000 * expired_token, // ms
                },
              ],
            },
          };
        }
      });
    } else {
      message = "Authorization Bearer is required!";
      print(traceId, { message });
      return {
        code: 403,
        render: {
          OUT_STAT: "F",
          OUT_MESS: "invalid_client",
          OUT_DATA: [{ error_description: message }],
        },
      };
    }
  } catch (error) {
    message = error.message;
    print(traceId, { error: "auth > refreshToken", message });
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
