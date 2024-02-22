const { Users } = require("./users.model");
const { FailedLoginAttempt } = require("./failed_login_attempts.model");

const models = {
  Users,
  FailedLoginAttempt,
};
exports.models = models;
