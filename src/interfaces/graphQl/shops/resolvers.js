const { Authenticate } = require("../../../middlewares/graphQl");
const { Shops } = require("../../../domains");

module.exports = {
  Query: {
    shops: Authenticate(async function (_, args, context, info) {
      try {
        const result = await Shops.GetShops(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    shopsLength: Authenticate(async function (_, args, context, info) {
      try {
        const result = await Shops.GetShopsLength(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
  },

  Mutation: {
    createShop: async function (_, args, context, info) {
      try {
        const result = await Shops.CreateShop(args, context);
        return result;
      } catch (err) {
        return err;
      }
    },
  },
};
