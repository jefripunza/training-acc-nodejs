const { print } = require("../utils/services");

const { isAlphanumeric } = require("../helpers/validation");

const CarsRepo = require("../models/repositories/CarsRepo");

exports.search = async (traceId, { keyword }) => {
  let message = "";
  try {
    if (keyword) {
      // validasi alphanumeric & length
      if (!isAlphanumeric(keyword) || String(keyword).length > 10) {
        message = "Invalid Input";
        print(traceId, { message });
        return {
          code: 400,
          render: {
            OUT_STAT: "F",
            OUT_MESS: message,
            OUT_DATA: [],
          },
        };
      }
    }

    let result = await CarsRepo.search(keyword);

    // render
    return {
      code: 200,
      render: {
        OUT_STAT: "T",
        OUT_MESS: "Success",
        OUT_DATA: result,
      },
    };
  } catch (error) {
    console.log({ error });
    message = error.message;
    print(traceId, { error: "cars > search", message });
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
