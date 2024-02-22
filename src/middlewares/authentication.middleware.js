const jwt = require("jsonwebtoken");
const HelperFunctions = require("../helper");
const { models } = require("../models");

class AuthenticationMiddleware {
  async handle(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return HelperFunctions.responseWrapper(
        res,
        401,
        "Missing authorization header."
      );
    }

    const token = authorization.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const verifyUser = await models.Users.findByPk(decoded.user.id);
      if (!verifyUser) {
        return HelperFunctions.responseWrapper(res, 401, "Invalid token.");
      }
      req.user = decoded.user;
      next();
    } catch (error) {
      console.log("error-authMiddleware", error);
      return HelperFunctions.responseWrapper(res, 401, "Invalid token.");
    }
  }
}

// module.exports = async function (req, res, next) {
//   await new AuthenticationMiddleware().handle(req, res, next);
// };


async function middleware(req, res, next) {
  await new AuthenticationMiddleware().handle(req, res, next);
}

module.exports = middleware;