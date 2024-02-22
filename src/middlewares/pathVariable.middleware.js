const HelperFunctions = require("../helper");

class PathVariableMiddleware {
  async handle(req, res, next) {
    try {
      const { id, slug, uuid } = req.params;
      // if (!id) {
      //   return HelperFunctions.responseWrapper(
      //     res,
      //     400,
      //     "Invalid ID provided."
      //   );
      // }
      // const valid = HelperFunctions.validatePathVariable(id);
      // if (!valid) {
      //   return HelperFunctions.responseWrapper(
      //     res,
      //     400,
      //     "Invalid ID provided."
      //   );
      // }
      const valid = id
        ? HelperFunctions.validatePathVariable("id", id)
        : slug
        ? HelperFunctions.validatePathVariable("slug", slug)
        : uuid
        ? HelperFunctions.validatePathVariable("uuid", uuid)
        : null;
      if (!valid) {
        return HelperFunctions.responseWrapper(
          res,
          400,
          "Invalid parameter provided."
        );
      }
      next();
    } catch (error) {
      console.log("error-PathVariableMiddleware", error);
      return HelperFunctions.responseWrapper(res, 500, "Something went wrong");
    }
  }
}

// module.exports = async function (req, res, next) {
//   await new PathVariableMiddleware().handle(req, res, next);
// };

async function middleware(req, res, next) {
  await new PathVariableMiddleware().handle(req, res, next);
}

module.exports = middleware;
