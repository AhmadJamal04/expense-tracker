const config = require("../config");
const { Users } = require("../models");
const { generateErrorInstance } = require("../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw generateErrorInstance({
          status: 400,
          message: "Required fields can't be empty",
        });
      }

      let user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw generateErrorInstance({
          status: 404,
          message: "User not found",
        });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        throw generateErrorInstance({
          status: 401,
          message: "Invalid Password",
        });
      }

      return sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  },
  signup: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw generateErrorInstance({
          status: 400,
          message: "Required fields can't be empty",
        });
      }
      const existingUser = await Users.findOne({
        where: { email },
      });
      if (existingUser) {
        throw generateErrorInstance({
          status: 409,
          message: "Email already exists!",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await Users.create({
        name,
        email,
        status: "PENDING",
        password: hashedPassword,
      });

      sendToken(user, 201, res);
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged out",
      });
    } catch (error) {
      next(error);
    }
  },
};
