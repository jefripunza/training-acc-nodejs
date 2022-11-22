const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Cars",
  tableName: "cars",
  columns: {
    // Meta : Selector
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    // ---------------------------------------- //

    // Meta : Timeline
    create_date: {
      type: "timestamp",
      default: () => {
        return "now()";
      },
    },

    // ---------------------------------------- //
    // Main Content

    // Foreign Key
    id_brand: {
      type: "int",
    },

    // Basic Content
    model: {
      type: "varchar",
      length: 100,
    },
    color: {
      type: "varchar",
      length: 100,
    },
    image: {
      type: "varchar",
      length: 100,
    },
  },
});
