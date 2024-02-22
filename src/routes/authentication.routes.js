const AuthenticationController = require("../controllers/authentication.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const ValidationMiddleware = require('../middlewares/validation.middleware');
const { loginSchema } = require("../schemas/authentication.schema");

class AuthenticationRoutes {
  register(app) {
    const controller = new AuthenticationController();
    app.post("/login", ValidationMiddleware.createHandler(loginSchema), controller.login);
    app.get("/protected", authenticationMiddleware, controller.protectedFunction);
    app.post("/migrate", controller.migrate);
  }
}

module.exports = new AuthenticationRoutes().register;
