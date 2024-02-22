const authenticationRoutes = require('./authentication.routes');
const usersRoutes = require('./users.routes');

class RouteRegistrar {
  constructor(app) {
    this.app = app;
  }
  registerRoutes() {
    authenticationRoutes(this.app);
    usersRoutes(this.app);
  }
}

module.exports = RouteRegistrar;
