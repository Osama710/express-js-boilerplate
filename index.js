const app = require('./express-config');
const RouteRegistrar = require('./src/routes');

const routeRegistrar = new RouteRegistrar(app);
routeRegistrar.registerRoutes();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`Server is listening on http://${host}:${port}`);
});
