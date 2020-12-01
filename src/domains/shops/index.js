const { ShopModel } = require("./model");
const { GenerateQuery } = require("../../helpers/model");
const { GenerateCode } = require("../../helpers/increment-code");

async function CreateShop({ input }, {}) {
  try {
    let shop = new ShopModel({
      code: await GenerateCode(ShopModel),
      ...input,
    });
    await shop.save();
    return shop;
  } catch (err) {
    throw err;
  }
}

async function GetShops({ filter, pagination }, {}) {
  try {
    let query = GenerateQuery({ ...filter, pagination });
    let shops = await ShopModel.find(query.filter)
      .skip(query.skip)
      .limit(query.limit)
      .select(query.select)
      .sort(query.sort)
      .lean();

    return shops;
  } catch (err) {
    throw err;
  }
}

async function GetShopsLength({ filter }, {}) {
  try {
    let query = GenerateQuery({ ...filter });
    let shopsLength = await ShopModel.countDocuments(query.filter);

    return shopsLength;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  GetShops,
  GetShopsLength,
  CreateShop,
};
