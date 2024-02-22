const UsersController = require("../controllers/users.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const pathVariableMiddleware = require("../middlewares/pathVariable.middleware");
const ValidationMiddleware = require("../middlewares/validation.middleware");
const { createUserSchema, updateUserSchema } = require("../schemas/users.schema");

class UsersRoutes {
  register(app) {
    const controller = new UsersController();
    app.get("/users", authenticationMiddleware, controller.usersListing);
    app.get("/user/:id", authenticationMiddleware, pathVariableMiddleware, controller.userByID);
    app.post("/user", authenticationMiddleware, ValidationMiddleware.createHandler(createUserSchema), controller.createUser);
    app.put("/user/:id", authenticationMiddleware, pathVariableMiddleware, ValidationMiddleware.createHandler(updateUserSchema), controller.updateUser);
    app.delete("/user/:id", authenticationMiddleware, pathVariableMiddleware, controller.deleteUser);
  }
}

module.exports = new UsersRoutes().register;
