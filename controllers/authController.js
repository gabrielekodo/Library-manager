const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Users = require("./../models/User");
const Books = require("./../models/BookModel");
const registerToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// create cookie
const createCookie = (res, token) => {
  cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 26 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render("login");
    }

    const user = await Users.findOne({ email }).select("+password");

    if (!user || !(await user.comparePasswords(password, user.password))) {
      return res.render("login");
    }
    user.password = undefined;
    console.log(user);
    const token = registerToken(user._id);

    createCookie(res, token);

    res.render("dashboard", { user });
    // res.redirect("/users/dashboard");
  } catch (error) {
    res.redirect("/login");
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    if (req.body.password === req.body.confirmPassword) {
      const newUser = new Users({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      await newUser.save();
      const token = registerToken(newUser._id);
      createCookie(res, token);
      const user = req.user;
      // res.render("dashboard", { user });
      res.redirect("/login");
    } else {
      res.redirect("/register");
    }
  } catch (error) {
    console.log(error);
    res.render("pageNotFound", { error });
  }
};

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
    } else if (req.cookies) {
      console.log(req.cookies);
      token = req.cookies.jwt;
    } else if (!token) {
      res
        .status(401)
        .json({ message: "you are not authorized to view this page!" });
    }
    // verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // checking if user still exists
    const currentUser = await Users.findById(decoded.id);
    if (!currentUser) {
      // res.status(401).json({ message: "No such user" });
      // res.clearCookie("jwt");
      res.redirect("/register");
    }

    req.user = currentUser;
    console.log(req.user);
  } catch (error) {
    // res.send(error);
    if (error.name === "JsonWebTokenError") {
      res.redirect("/login");
    }
  }

  next();
};

module.exports = { login, register, protect };
