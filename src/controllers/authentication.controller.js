const BaseController = require("./base.controller"); // Assuming you have a base controller
const { models } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getIP = require("ipware")();

class AuthenticationController extends BaseController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await models.Users.findOne({
        where: { email },
      });
      if (user !== null) {
        if (!user.is_active) {
          return this.response(res, 400, "Please contact your administrator");
        }
        const isPasswordValid = await bcrypt.compare(
          password.toString(),
          user.password.toString()
        );
        const failedLoginAttempts = await models.FailedLoginAttempt.findAll({
          where: { user_id: user.id },
          order: [["created_at", "DESC"]],
        });

        if (failedLoginAttempts && failedLoginAttempts.length >= 3) {
          const latestFailedAttemptTimestamp =
            failedLoginAttempts[0].created_at;
          const currentTimestamp = new Date();
          const fiveMinutesAgo = new Date(
            currentTimestamp.getTime() - 5 * 60 * 1000
          );
          if (latestFailedAttemptTimestamp > fiveMinutesAgo) {
            return this.response(
              res,
              400,
              "Too many failed login attempts. Please try again later."
            );
          }
        }

        if (isPasswordValid) {
          await models.FailedLoginAttempt.destroy({
            where: { user_id: user.id },
          });
          const token = jwt.sign({ user }, process.env.JWT_SECRET);
          user.setDataValue("token", token);
          user.setDataValue("password", null);
          return this.response(res, 200, user, "Logged in successfully!");
        } else {
          const ipdetails = getIP.get_ip;
          const clientIp = ipdetails(req).clientIp;
          await models.FailedLoginAttempt.create({
            user_id: user.id,
            ip_address: clientIp,
          });
          return this.response(res, 400, "Invalid email or password");
        }
      } else {
        return this.response(res, 400, "Invalid email or password");
      }
    } catch (error) {
      console.log("error", error);
      return this.response(res, 500, "Something went wrong");
    }
  };
  protectedFunction = async (req, res) => {
    try {
      return this.response(res, 200, {}, "Hello World!!!!");
    } catch (error) {
      console.log("Error occurred: ", error);
      return this.response(res, 500, "Something went wrong");
    }
  };
  migrate = async (req, res) => {
    try {
      await models.Users.sync();
      await models.FailedLoginAttempt.sync();

      const plain_password = "Test@123";
      const saltRounds = 5;

      const hashedPassword = await bcrypt.hash(
        plain_password,
        parseInt(saltRounds)
      );
      const admin = await models.Users.create({
        first_name: "Super",
        last_name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
      });
      return this.response(
        res,
        200,
        {},
        `DB created, permissions added successfully.`
      );
    } catch (error) {
      console.log("error", error);
      return this.response(res, 500, error.message);
    }
  };
}

module.exports = AuthenticationController;
