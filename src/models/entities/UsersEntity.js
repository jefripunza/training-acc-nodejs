const EntitySchema = require("typeorm").EntitySchema;

const { privilege, api_key_length } = require("../../consts");

module.exports = new EntitySchema({
  name: "Users",
  tableName: "users",
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

    // Authorization
    username: {
      type: "varchar",
      length: 30,
      unique: true,
    },
    password: {
      type: "varchar",
      length: 100,
    },

    // Basic Content
    name: {
      type: "varchar",
      length: 100,
    },
    privilege: {
      type: "enum",
      enum: Object.values(privilege),
      default: privilege.client,
    },

    // Items
    api_key: {
      type: "varchar",
      length: api_key_length,
    },
  },
});
