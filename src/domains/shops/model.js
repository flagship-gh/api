const { SetMail, SetPhone } = require("../../helpers/string");
const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const ShopSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      set: SetMail,
      required: true,
    },
    phone: {
      type: String,
      set: SetPhone,
      required: true,
    },
    employeeSize: {
      type: Number,
      required: false,
    },
    shopType: {
      type: String,
      enum: ["Salon", "BarberingShop"],
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    location: LocationSchema,
    timeOpen: {
      type: String,
      required: false,
    },
    timeClose: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Registered", "Unregistered"],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ShopModel = mongoose.model("Shops", ShopSchema);

module.exports = {
  ShopModel,
};
