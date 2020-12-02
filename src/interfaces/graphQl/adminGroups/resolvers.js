const { AuthenticateAdmin } = require("../../../middlewares/graphQl");
const { AdminGroups } = require("../../../domains");

module.exports = {
  Query: {
    adminGroup: AuthenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await AdminGroups.GetAdminGroup(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    adminGroups: AuthenticateAdmin(async function (_, args, context, info) {
      try {
        const result = await AdminGroups.GetAdminGroups(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    adminGroupsLength: AuthenticateAdmin(async function (
      _,
      args,
      context,
      info
    ) {
      try {
        const result = await AdminGroups.GetAdminGroupsLength(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
  },
  Mutation: {
    createAdminGroup: AuthenticateAdmin(async function (
      _,
      args,
      context,
      info
    ) {
      try {
        const result = await AdminGroups.CreateAdminGroup(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    updateAdminGroup: AuthenticateAdmin(async function (
      _,
      args,
      context,
      info
    ) {
      try {
        const result = await AdminGroups.UpdateAdminGroup(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
    deleteAdminGroup: AuthenticateAdmin(async function (
      _,
      args,
      context,
      info
    ) {
      try {
        const result = await AdminGroups.DeleteAdminGroup(args, context);
        return result;
      } catch (err) {
        return err;
      }
    }),
  },
};
