const HelperFunctions = require("../helper");

class ValidationMiddleware {
  constructor(resourceSchema) {
    this.resourceSchema = resourceSchema;
  }

  async handle(req, res, next) {
    try {
      await this.resourceSchema.validate(req.body, { abortEarly: false });
      next(); // Call next middleware if validation succeeds
    } catch (error) {
      console.log(error);
      // Send response if validation fails
      return HelperFunctions.responseWrapper(res, 400, error.errors);
    }
  }

  static createHandler(schema) {
    const instance = new ValidationMiddleware(schema);
    return instance.handle.bind(instance);
  }
}

module.exports = ValidationMiddleware;