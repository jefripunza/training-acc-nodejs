const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Brands",
  tableName: "brands",
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

    // Basic Content
    name: {
      type: "varchar",
      length: 100,
    },
  },
});
