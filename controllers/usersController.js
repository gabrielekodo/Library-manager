const mongoose = require("mongoose");
const Users = require("./../models/User");
const Books = require("./../models/BookModel");
// login POST /login

const loginPage = (req, res) => {
  res.render("login");
  // console.log(req.cookies.jwt);
};

// register POST /register

const registerPage = (req, res) => {
  res.render("register");
};

// GET /users/dashboard
const userDashboard = async (req, res) => {
  try {
    const user = await Users.find();
    const books = await Books.find();
    res.render("dashboard", { user, books });
  } catch (error) {
    console.log(error);
    res.render("pageNotFound", { error });
  }
};
module.exports = {
  loginPage,
  userDashboard,
  registerPage,
};
