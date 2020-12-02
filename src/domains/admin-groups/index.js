const { AdminGroupModel } = require("./model");
const { GenerateQuery } = require("../../helpers/model");
const { GenerateCode } = require("../../helpers/increment-code");

async function CreateAdminGroup({ input }, {}) {
  try {
    const adminGroup = new AdminGroupModel({
      code: await GenerateCode(AdminGroupModel),
      ...input,
    });

    await adminGroup.save();
    return adminGroup;
  } catch (err) {
    throw err;
  }
}

async function UpdateAdminGroup({ input }) {
  try {
    const adminGroup = await AdminGroupModel.findByIdAndUpdate(
      input.adminGroupId,
      { ...input },
      { new: true }
    );

    return adminGroup;
  } catch (err) {
    throw err;
  }
}

async function DeleteAdminGroup({ input }) {
  try {
    const adminGroup = await AdminGroupModel.findByIdAndRemove(
      input.adminGroupId
    );

    return adminGroup;
  } catch (err) {
    throw err;
  }
}

async function GetAdminGroup({ filter }) {
  try {
    const adminGroup = await AdminGroupModel.findById(
      filter.adminGroupId
    ).lean();
    return adminGroup;
  } catch (err) {
    throw err;
  }
}

async function GetAdminGroups({ filter, pagination }) {
  try {
    const query = GenerateQuery({ ...filter, pagination });
    const adminGroup = await AdminGroupModel.find(query.filter)
      .skip(query.skip)
      .limit(query.limit)
      .select(query.select)
      .sort(query.sort)
      .lean();

    return adminGroup;
  } catch (err) {
    throw err;
  }
}

async function GetAdminGroupsLength({ filter }) {
  try {
    const query = GenerateQuery({ ...filter });
    const adminGroupsLength = await AdminGroupModel.countDocuments(
      query.filter
    );
    return adminGroupsLength;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  CreateAdminGroup,
  UpdateAdminGroup,
  DeleteAdminGroup,
  GetAdminGroup,
  GetAdminGroups,
  GetAdminGroupsLength,
};
