const jwt = require("jsonwebtoken");
const tokens = require("./../utils/tokens");
const { promisify } = require("util");
const Users = require("./../models/User");
const Books = require("./../models/BookModel");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ status: "fail", message: " enter email and password" });
    }

    const user = await Users.findOne({ email }).select("+password");

    if (!user || !(await user.comparePasswords(password, user.password))) {
      return res
        .status(401)
        .json({ status: "fail", message: "wrong credentials. Log in again" });
    }
    user.password = undefined;
    console.log("USER***************", user);
    const token = tokens.registerToken(user._id);

    tokens.createCookie(res, token);

    res.status(200).json({ status: "success", token, user });
    // res.redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Something went wrong" });
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
      const token = tokens.registerToken(newUser._id);
      tokens.createCookie(res, token);

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
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  } else if (req.cookies.jwt) {
    // console.log(req.cookies.jwt);
    token = req.cookies.jwt;
  } else if (!token) {
    return res.status(401).render("errors", {
      message: "you are not authorized to view this page!",
    });
  }
  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log("DECODED TOKEN", decoded.id);
  // checking if user still exists
  const currentUser = await Users.findById(decoded.id);
  console.log("CURRENT USER *********", currentUser);
  if (!currentUser) {
    // res.status(401).json({ message: "No such user" });
    // res.clearCookie("jwt");
    return res
      .status(401)
      .json({ status: "fail", message: "Log in  to access book" });
  }

  req.user = currentUser;
  res.locals.user = currentUser;

  console.log("CURRENT USER ############", req.user);
  console.log(" RES.LOCALS ############", res.locals);

  next();
};

// only for rendered pages
const loggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      // console.log(req.cookies.jwt);
      token = req.cookies.jwt;
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      const currentUser = await Users.findById(decoded.id);
      // console.log("logged user", currentUser);
      // console.log(user);
      if (!currentUser) {
        return next();
      }

      res.locals.user = currentUser;
      console.log("*******locals*******", res.locals.user);
      return next();
    }
  } catch (error) {
    res.status(403).render("errors", {
      message: "You must be logged in to access resource",
    });
  }
  next();
};

const logout = (req, res, next) => {
  // res.clearCookie("jwt");
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  // res.locals.user = undefined;
  res.status(200).render("index");
};

const restrictedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have the rights to permit this action",
      });
    }
    next();
  };
};

module.exports = { login, register, protect, loggedIn, restrictedTo, logout };
