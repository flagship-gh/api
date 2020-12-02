const { SchemaTypes, Schema, model } = require("mongoose");
const {
  SetDescription,
  SetPermission,
  SetName,
} = require("../../helpers/string");

const AdminGroupSchema = new Schema(
  {
    code: {
      type: SchemaTypes.String,
      unique: true,
      required: true,
    },
    name: {
      type: SchemaTypes.String,
      unique: true,
      set: SetName,
      required: true,
    },
    description: {
      type: SchemaTypes.String,
      set: SetDescription,
      required: false,
    },
    permissions: {
      type: [SchemaTypes.String],
      default: [],
      set: SetPermission,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminGroupModel = model("AdminGroup", AdminGroupSchema);

module.exports = { AdminGroupModel };
