const { print } = require("../utils/services");

const { isAlphanumeric } = require("../helpers/validation");

const BrandsRepo = require("../models/repositories/BrandsRepo");
const CarsRepo = require("../models/repositories/CarsRepo");

exports.search = async (traceId, { keyword, "with-car": with_car }) => {
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
    with_car = with_car === "true";

    let result = await BrandsRepo.search(keyword, with_car);
    if (with_car) {
      const brand_ids = result.map((v) => v.id);
      const cars = await CarsRepo.inBrandId(brand_ids);
      result = result.map((v) => {
        v.cars = cars.filter((a) => a.id_brand === v.id);
        delete v.id;
        return v;
      });
    }

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
    message = error.message;
    print(traceId, { error: "brand > search", message });
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
