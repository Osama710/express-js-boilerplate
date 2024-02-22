const UsersController = require("../controllers/users.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const pathVariableMiddleware = require("../middlewares/pathVariable.middleware");
const ValidationMiddleware = require("../middlewares/validation.middleware");
const { createUserSchema, updateUserSchema } = require("../schemas/users.schema");

class UsersRoutes {
  register(app) {
    const controller = new UsersController();
    app.get("/users", authenticationMiddleware, (req, res) => controller.usersListing(req, res));
    app.get("/user/:id", authenticationMiddleware, pathVariableMiddleware, (req, res) => controller.userByID(req, res));
    app.post("/user", authenticationMiddleware, ValidationMiddleware.createHandler(createUserSchema), (req, res) => controller.createUser(req, res));
    app.put("/user/:id", authenticationMiddleware, pathVariableMiddleware, ValidationMiddleware.createHandler(updateUserSchema), (req, res) => controller.updateUser(req, res));
    app.delete("/user/:id", authenticationMiddleware, pathVariableMiddleware, (req, res) => controller.deleteUser(req, res));
  }
}

module.exports = new UsersRoutes().register;
