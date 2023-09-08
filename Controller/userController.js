const secure = require("../bcrypt/bcrypt");
const user = require("../models/userModel");

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      const oldUser = await user.findOne({ email: req.body.email });
      if (!oldUser) {
  newUser.password = await secure(newUser.password)
        const User = await newUser.save();
      return res.status(409).json({
        message: "success",
        User
      });
      } else {
        res.status(409).json({
          message: "user Already exits please login",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

  module.exports = {
    userRegister
  }