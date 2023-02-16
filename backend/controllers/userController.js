const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.addNewUser = async (parent, args) => {
  const user = {
    email: args.email,
    password: args.password,
  };

  try {
    const repeat = await User.findOne({ email: user.email });

    if (repeat) {
      throw new Error("User exists already");
    }

    const newUser = new User(user);

    //Encrypt password
    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(user.password, salt);

    const result = await newUser.save();

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    const token = await jwt.sign(payload, "whatever", {
      expiresIn: 360000,
    });

    return { token: token, email: user.email, expiresIn: 360000 };
  } catch (e) {
    throw e;
  }
};

exports.loginUser = async (parent, args) => {
  const user = {
    email: args.email,
    password: args.password,
  };

  try {
    const found = await User.findOne({ email: user.email });

    if (!found) {
      throw new Error("Invalid Credentials");
    }

    // match password
    const isMatch = await bcrypt.compare(user.password, found.password);

    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    const payload = {
      user: {
        id: found.id,
      },
    };

    const token = await jwt.sign(payload, "whatever", {
      expiresIn: 360000,
    });

    return { token: token, email: user.email, expiresIn: 360000 };
  } catch (e) {
    throw e;
  }
};
