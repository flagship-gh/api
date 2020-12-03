const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const { ValidateAuthToken } = require("../helpers/token");

async function SetContext({ req }) {
  let __context = {};

  if (req.headers.authorization) {
    let __authorization = await ValidateAuthToken(req.headers.authorization);
    if (!__authorization) throw new AuthenticationError("InvalidToken");
    switch (__authorization.type) {
      case "User":
        __context.user = __authorization.id;
        break;

      case "Admin":
        __context.admin = __authorization.id;
        break;
    }
  }

  return __context;
}

async function SetSubcriptionsContext({ connectionParams, webSocket }) {
  let context = {};

  if (connectionParams.authorization) {
    let authorization = await ValidateAuthToken(connectionParams.authorization);
    if (!authorization) {
      throw new AuthenticationError("InvalidToken");
    }

    switch (authorization.type) {
      case "User":
        context.user = authorization.id;
        break;

      case "Admin":
        context.admin = authorization.id;
        break;
    }
  } else {
    throw new Error("MissingAuthToken");
  }
  return context;
}

function FormatError(err) {
  if (err.message.includes("AuthorizationExpired")) {
    return new AuthenticationError("AuthorizationExpired");
  }
  if (err.message.includes("InvalidOrigin")) {
    return new ForbiddenError("InvalideOrigin");
  }
  if (err.message.includes("InvalidToken")) {
    return new AuthenticationError("InvalidToken");
  }

  return err;
}

function Authenticate(next) {
  return function (_, args, context, info) {
    if (!context.admin && !context.user) {
      return new AuthenticationError("AuthenticationFailed");
    }
    return next(_, args, context, info);
  };
}

function AuthenticateAdmin(next) {
  return function (_, args, context, info) {
    if (!context.admin) {
      return new AuthenticationError("AuthenticationFailed");
    }
    return next(_, args, context, info);
  };
}

module.exports = {
  SetContext,
  SetSubcriptionsContext,
  FormatError,
  Authenticate,
  AuthenticateAdmin,
};
