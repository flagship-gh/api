const { Authenticate } = require("../../../middlewares/graphQl");
const { Admins } = require("../../../domains");

module.exports = {
  Query: {
    admin: Authenticate(async function (_, args, context) {
      try {
        const result = await Admins.GetAdmin(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    admins: Authenticate(async function (_, args, context) {
      try {
        const result = await Admins.GetAdmins(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    adminsLength: Authenticate(async function (_, args, context) {
      try {
        const result = await Admins.GetAdminsLength(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
  },
  Mutation: {
    createAdmin: async function (_, args, context, info) {
      try {
        const result = await Admins.CreateAdmin(args, context);
        return result;
      } catch (err) {
        return err;
      }
    },
    updateAdmin: Authenticate(async function (_, args, context, info) {
      try {
        const result = await Admins.UpdateAdmin(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    updateAdminPassword: Authenticate(async function (_, args, context) {
      try {
        const result = await Admins.UpdateAdminPassword(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    suspendAdmin: Authenticate(async function (_, args, context) {
      try {
        const result = await Admins.SuspendAdmin(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    loginAdmin: async function (_, args, context) {
      try {
        const result = await Admins.LoginAdmin(args, context);
        return result;
      } catch (err) {
        return err;
      }
    },
  },
};
