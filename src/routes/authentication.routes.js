const AuthenticationController = require("../controllers/authentication.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const ValidationMiddleware = require('../middlewares/validation.middleware');
const { loginSchema } = require("../schemas/authentication.schema");

class AuthenticationRoutes {
  register(app) {
    const controller = new AuthenticationController();
    app.post("/login", ValidationMiddleware.createHandler(loginSchema), (req, res) => controller.login(req, res));
    app.get("/protected", authenticationMiddleware, (req, res) => controller.protectedFunction(req, res));
    app.post("/migrate", (req, res) => controller.migrate(req, res));
  }
}

module.exports = new AuthenticationRoutes().register;
