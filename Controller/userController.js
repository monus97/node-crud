const secure = require("../bcrypt/bcrypt");
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const oldUser = await user.findOne({ email: req.body.email });
    if (!oldUser) {
      const hashedPassword = await secure(password);
      const newUser = await user.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const User = await newUser.save();
      User.password = undefined;
      return res.status(201).json({
        message: "success",
        User,
      });
    } else {
      return res.status(409).json({
        message: "you are already registered please login",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter all fields!",
      });
    }

    const checkEmail = await user.findOne({ email: req.body.email });
    if (!checkEmail) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
    const isMatch = await bcrypt.compare(password, checkEmail.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
    checkEmail.password = undefined;
    const token = jwt.sign({ id: checkEmail._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const userUpdateHisProfile = async (req, res) => {
  try {
    const id = req.user._id;

    const { name, email } = req.body;
    const payload = {
      name,
      email,
    };
    const updatedUser = await user
      .findByIdAndUpdate(id, payload, {
        new: true,
      })
      .select("-__v -password");

    if (updatedUser != null) {
      const update = await updatedUser.save();
      res.status(200).json({
        message: "updated successfull",
        updatedData: update,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.user._id;
    const userDetails = await user.findById(id).select("-__v -password");
    if (!userDetails) {
      return res.status(400).json({
        message: "some-thing went wrong",
      });
    }
    res.status(200).json({
      success: true,
      userDetails: userDetails,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// const get = async (req, res) => {
//   try {
//     const id = req.user._id;
//     const userDetails = await user.findById(id).select("-__v -password");
//     if (!userDetails) {
//       return res.status(400).json({
//         message: "some-thing went wrong",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       userDetails: userDetails,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };

module.exports = {
  userRegister,
  loginUser,
  userUpdateHisProfile,
  getUserById,
};
