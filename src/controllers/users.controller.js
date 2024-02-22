const BaseController = require("./base.controller"); // Assuming you have a base controller
const { models } = require("../models/index");
const HelperFunctions = require("../helper");
const bcrypt = require("bcrypt");

class UsersController extends BaseController {
  usersListing = async (req, res) => {
    try {
      const users = await models.Users.findAll({
        attributes: { exclude: ["password"] },
      });
      return this.response(res, 200, users, "Users fetched successfully");
    } catch (error) {
      console.log("error", error);
      return this.response(res, 500, "Something went wrong");
    }
  };

  userByID = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await models.Users.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return this.response(res, 404, "User not found");
      }
      return this.response(res, 200, user, "User fetched successfully");
    } catch (error) {
      console.log("error", error);
      return this.response(res, 500, "Something went wrong");
    }
  };

  createUser = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await models.Users.findOne({ where: { email } });
      if (user) {
        return this.response(res, 400, "User with this email already exists");
      }
      const password = HelperFunctions.generateRandomPassword(8);
      req.body.password = await bcrypt.hash(password, 10);
      const newUser = await models.Users.create(req.body);
      return this.response(res, 200, newUser, "User created successfully");
    } catch (error) {
      console.log("error", error);
      return this.response(res, 500, "Something went wrong");
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const { email } = req.body;
      const user = await models.Users.findByPk(id);
      if (!user) {
        return this.response(res, 404, "User not found");
      }
      if (email) {
        const existingUser = await models.Users.findOne({ where: { email } });
        if (existingUser) {
          return this.response(res, 400, "User with this email already exists");
        }
      }
      const updatedUser = await user.update(req.body);
      return this.response(res, 200, updatedUser, "User updated successfully");
    } catch (error) {
      console.log("error", error);
      return this.response(res, 500, "Something went wrong");
    }
  };

  deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await models.Users.findByPk(id);
      if (!user) {
        return this.response(res, 404, "User not found");
      }
      await user.destroy();
      return this.response(res, 200, null, "User deleted successfully");
    } catch (error) {
      console.log("error", error);
      return this.response(res, 500, "Something went wrong");
    }
  };
}

module.exports = UsersController;
