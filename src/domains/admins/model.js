const { SchemaTypes, Schema, model } = require("mongoose");
const { SetMail, SetName, SetPhone } = require("../../helpers/string");
const { GenerateAuthToken } = require("../../helpers/token");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const AdminSchema = new Schema(
  {
    code: {
      type: SchemaTypes.String,
      unique: true,
      required: false,
    },
    lastName: {
      type: SchemaTypes.String,
      set: SetName,
      required: true,
    },
    otherNames: {
      type: SchemaTypes.String,
      set: SetName,
      required: true,
    },
    email: {
      type: SchemaTypes.String,
      set: SetMail,
      unique: true,
      required: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    phone: {
      type: SchemaTypes.String,
      set: SetPhone,
      unique: true,
      required: true,
    },
    suspended: {
      type: SchemaTypes.Boolean,
      default: false,
      required: true,
    },
    suspendedAt: {
      type: SchemaTypes.Date,
      required: false,
    },
    suspendedBy: {
      type: SchemaTypes.ObjectId,
      ref: "Admin",
      required: false,
    },
    group: {
      type: SchemaTypes.ObjectId,
      ref: "AdminGroup",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

AdminSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

AdminSchema.methods.generateAuthToken = async function () {
  let token = await GenerateAuthToken({
    id: this._id,
    type: "Admin",
  });
  return token;
};

AdminSchema.plugin(uniqueValidator, { message: "{PATH}AlreadyExists" });

const AdminModel = model("Admin", AdminSchema);

module.exports = {
  AdminModel,
};
