const HelperFunctions = require("../helper");

class BaseController {
    // Define common methods or functionality shared across controllers
  response(res, status, data = {}, message, linenumber = null, explict_count = null) {
    return HelperFunctions.responseWrapper(res, status, data, message, linenumber, explict_count);
  }
}
  
module.exports = BaseController;
  