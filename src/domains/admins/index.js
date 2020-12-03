const { AdminModel } = require("./model");
const { AdminGroupModel } = require("../admin-groups/model");
const { GenerateQuery } = require("../../helpers/model");
const { GenerateCode } = require("../../helpers/increment-code");
const { SetPhone, SetMail } = require("../../helpers/string");

async function CreateAdmin({ input }, {}) {
  try {
    const admin = new AdminModel({
      code: await GenerateCode(AdminModel),
      ...input,
    });

    await admin.save();
    return admin;
  } catch (err) {
    throw err;
  }
}

async function UpdateAdmin({ input }, {}) {
  try {
    let group;
    if (input.groupId) {
      group = await AdminGroupModel.findById(input.groupId);
      if (!group) throw new Error("GroupNotFound");
    }
    const admin = new AdminModel.findByIdAndUpdate(
      input.adminId,
      { ...input },
      { new: true }
    );

    return admin;
  } catch (err) {
    throw err;
  }
}

async function UpdateAdminPassword({ input }, { _admin }) {
  try {
    const admin = await AdminModel.findById(_admin);
    if (!admin) throw new Error("AdminNotFound");
    admin.password = input.password;
    admin.save();
    return admin;
  } catch (err) {
    throw err;
  }
}

async function SuspendAdmin({ input }, { _admin }) {
  try {
    const admin = await AdminModel.findByIdAndUpdate(
      input.adminId,
      {
        $set: {
          suspended: true,
          suspendedAt: new Date(),
          suspendedBy: _admin,
        },
      },
      { new: true }
    );
    return admin;
  } catch (err) {
    throw err;
  }
}

async function UnsuspendAdmin({ input }, { _admin }) {
  try {
    const _admin = await AdminModel.findByIdAndUpdate(
      input.adminId,
      {
        $set: {
          suspended: false,
        },
      },
      { new: true }
    );
    return _admin;
  } catch (err) {
    throw err;
  }
}

async function GetAdmin({ filter }) {
  try {
    const admin = await AdminModel.findById(filter.adminId).lean();
    return admin;
  } catch (err) {
    throw err;
  }
}

async function LoginAdmin({ input }, {}) {
  try {
    const admin = await AdminModel.findOne({
      $or: [
        { phone: SetPhone(input.username) },
        { email: SetMail(input.username) },
      ],
    });
    if (!admin) throw new Error("AccountNotFound");
    if (admin.suspended) throw new Error("AccountSuspended");
    let isValid = await admin.comparePasswords(input.password);
    if (!isValid) throw new Error("IncorrectPassword");
    return {
      admin: admin,
      token: await admin.generateAuthToken(),
    };
  } catch (err) {
    throw err;
  }
}

async function GetAdmins({ filter, pagination }, {}) {
  try {
    const query = GenerateQuery({
      ...filter,
      pagination,
    });
    const admins = await AdminModel.find(query.filter)
      .skip(query.skip)
      .limit(query.limit)
      .select(query.select)
      .sort(query.sort)
      .lean();
    return admins;
  } catch (err) {
    throw err;
  }
}

async function GetAdminsLength({ filter }, {}) {
  try {
    const query = __generateQuery({ ...filter });
    const adminsLength = await AdminModel.countDocuments(query.filter);
    return adminsLength;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  CreateAdmin,
  UpdateAdmin,
  UpdateAdminPassword,
  SuspendAdmin,
  UnsuspendAdmin,
  GetAdmin,
  LoginAdmin,
  GetAdmins,
  GetAdminsLength,
};
