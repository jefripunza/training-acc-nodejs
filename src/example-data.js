const { privilege, api_key_length } = require("./consts");
const random = require("./helpers/random");

const users = [
  {
    username: "client_credentials1",
    password: "12345678",
    name: "Aku",
    privilege: privilege.sa,
    api_key: random.Text(api_key_length),
  },
  {
    username: "client_credentials2",
    password: "12345678",
    name: "Kamu",
    privilege: privilege.admin,
    api_key: random.Text(api_key_length),
  },
  {
    username: "client_credentials3",
    password: "12345678",
    name: "Dia",
    privilege: privilege.client,
    api_key: random.Text(api_key_length),
  },
];

const brands = ["Toyota", "Daihatsu", "Isuzu"];

const cars = [
  {
    brand: "Toyota",
    model: "Supra",
    color: "Red",
    image:
      "https://images.prod.seva.id/Toyota/Supra/new_funnel_main_color/galery_toyota_supra_Eksterior_1.png",
  },
  {
    brand: "Toyota",
    model: "Vellfire",
    color: "Red",
    image:
      "https://images.prod.seva.id/Toyota/Vellfire/new_funnel_main_color/galery_toyota_vellfire_eksterior_1.png",
  },
  {
    brand: "Toyota",
    model: "All New BZ4X",
    color: "Black",
    image:
      "https://images.prod.seva.id/Toyota/All New BZ4X/new_funnel_main_color/eksterior_20220412_01_05.jpg",
  },
  {
    brand: "Toyota",
    model: "New Alphard",
    color: "White",
    image:
      "https://images.prod.seva.id/Toyota/New Alphard/new_funnel_main_color/main_galeri_toyota_alphard_eksterior_1.jpg",
  },
  {
    brand: "Toyota",
    model: "All New Camry",
    color: "Black",
    image:
      "https://images.prod.seva.id/Toyota/All New Camry/new_funnel_main_color/main_galery_toyota_camry_hybrid_eksterior_1.jpg",
  },
  {
    brand: "Toyota",
    model: "Hiace Premio",
    color: "White",
    image:
      "https://images.prod.seva.id/Toyota/The All New Hiace Premio/new_funnel_main_color/galery_toyota_hiace_premio_eksterior_1.png",
  },
  {
    brand: "Toyota",
    model: "All New C-HR",
    color: "Silver",
    image:
      "https://images.prod.seva.id/Toyota/All New C-HR/new_funnel_main_color/ekschr_1.jpg",
  },
  {
    brand: "Toyota",
    model: "All New Voxy",
    color: "Black",
    image:
      "https://images.prod.seva.id/Toyota/All New Voxy/new_funnel_main_color/voxy_eksterior_1.jpg",
  },

  {
    brand: "Isuzu",
    model: "MU-X",
    color: "Black",
    image:
      "https://storage.googleapis.com/images.staging.torq.id/Isuzu/MU-X/new_funnel_main_color/mux_black.png",
  },
  {
    brand: "Isuzu",
    model: "D-MAX",
    color: "Black",
    image:
      "https://images.prod.torq.id/Isuzu/D-MAX/new_funnel_main_color/dmax_black.png",
  },

  {
    brand: "Daihatsu",
    model: "All New Terios",
    color: "Red",
    image:
      "https://images.prod.seva.id/Daihatsu/All New Terios/new_funnel_main_color/galery_daihatsu_all_new_terios_eksterior_5.jpg",
  },
  {
    brand: "Daihatsu",
    model: "Luxio",
    color: "White",
    image:
      "https://images.prod.seva.id/Daihatsu/Luxio/new_funnel_main_color/eksluxio_8.jpg",
  },
  {
    brand: "Daihatsu",
    model: "New Sirion",
    color: "Silver",
    image:
      "https://images.prod.seva.id/Daihatsu/New Sirion/new_funnel_main_color/galery_daihatsu_sirion_eksterior_5.jpg",
  },
  {
    brand: "Daihatsu",
    model: "All New Xenia",
    color: "Black",
    image:
      "https://images.prod.seva.id/Daihatsu/All New Xenia/new_funnel_main_color/black.png",
  },
  {
    brand: "Daihatsu",
    model: "Rocky",
    color: "Red",
    image:
      "https://images.prod.seva.id/Daihatsu/Rocky/new_funnel_main_color/galery_daihatsu_rocky_eksterior_8.png",
  },
  {
    brand: "Daihatsu",
    model: "Granmax MB",
    color: "White",
    image:
      "https://images.prod.seva.id/Daihatsu/Granmax MB/new_funnel_main_color/eksgranmaxmb_1.jpg",
  },
];

// --------------------------------------------------------------------------------------------------------------
//-> Migration Data Example

const encryption = require("./utils/encryption");

// Setup Environment
require("dotenv").config();

// All Repository
const UsersRepo = require("./models/repositories/UsersRepo");
const BrandsRepo = require("./models/repositories/BrandsRepo");
const CarsRepo = require("./models/repositories/CarsRepo");

try {
  require("./app/database")(async () => {
    console.log("🚀 Start Migrating Example Data...");

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      user.password = encryption.encode(user.password);
      await UsersRepo.insertNew(user);
    }

    for (let i = 0; i < brands.length; i++) {
      const brand = brands[i];
      await BrandsRepo.insertNew({
        name: brand,
      });
    }

    const all_brands = await BrandsRepo.showAll();
    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];
      const brand_selected = all_brands.filter((v) => v.name === car.brand)[0];
      delete car.brand;
      await CarsRepo.insertNew({
        id_brand: brand_selected.id,
        ...car,
      });
    }

    console.log("✅ All Example Data is Ready !!");
    process.exit();
  });
} catch (error) {
  console.log({ error });
}
