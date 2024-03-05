const jwt = require("jsonwebtoken");
const config = require("../config");

const sendToken = async (user, statusCode, res) => {
  const token = await jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret
  );

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000 // 30 days
    ),
    httpOnly: process.env.NODE_ENV === "Production",
    secure: process.env.NODE_ENV === "Production",
    sameSite: process.env.NODE_ENV === "Production" && "None", // Adjust based on your requirements
  };

  user = user.toJSON();
  delete user.password;

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
