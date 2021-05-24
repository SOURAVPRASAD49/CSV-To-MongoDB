const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//register user
module.exports.registerUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(501).send({
          message: "Email already exists",
        });
      }
      bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        user.save().then((user) => {
          return res.status(201).send({
            message: "User registered successfully!!",
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(504).json({ message: "Something went wrong" });
    });
};

//passport middleware
module.exports.isAuth = passport.authenticate("jwt", { session: false });

//login user
module.exports.loginUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "Email is not found.Invalid login credentials",
        });
      }
      bcrypt.compare(req.body.password, user.password).then((checkPassword) => {
        if (!checkPassword) {
          return res.status(403).json({
            message: "Incorrect password",
          });
        }
      });
      const token = jwt.sign(
        { user_id: user._id, name: user.name },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1h" }
      );

      const result = {
        name: user.name,
        token: `Bearer ${token}`,
      };

      return res.status(200).json({
        ...result,
        message: "LoggedIn successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(504).json({ message: "Something went wrong" });
    });
};
