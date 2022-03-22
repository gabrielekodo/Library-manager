const upload = require("./imageUpload");
const singleUpload = upload.single("image");

const multer = require("multer");
const multerS3 = require("multer-s3");

const tokens = require("./../utils/tokens");
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

// Load all users GET
const loadUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res
      .status(200)
      .json({ status: "success", Total: users.length, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Error loading users" });
  }
};

// single user GET
const singleUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "no such user" });
  }
};

// UPDATE USER INFO PATCH /api/v1/users/:id
const updateUser = async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return;
    }
    await updatedUser.save();

    res.status(200).json({ status: "success", data: updateUser });
  } catch (error) {
    console.log(error._message);
    res.status(500).json({ status: "fail", message: "something went wrong" });
  }
};

// DELETE single user DELETE only admin can delete
const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);

    res.status(204).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "no such user" });
  }
};
// GET /users/dashboard
const userDashboard = async (req, res) => {
  try {
    const user = await Users.findById(res.locals.user._id);

    const books = await Books.find();

    res.render("dashboard", { user, books });
  } catch (error) {
    console.log(error);
    res.render("pageNotFound", { error });
  }
};
// GET all users /allUsersPage
const allUsersPage = async (req, res) => {
  try {
    const users = await Users.find();

    const books = await Books.find();

    res.render("users", { users, books });
  } catch (error) {
    console.log(error);
    res.render("pageNotFound", { error });
  }
};

// USER SIGN UP /Register post
const signUpUser = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.password === req.body.confirmPassword) {
      const newUser = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      await newUser.save();

      res.status(201).json({ status: "success", data: newUser });
    } else {
      res
        .status(500)
        .json({ status: "fail", message: "Error in registration. Try again" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// UPLOAD PROFILE PICTURE
const uploadProfilePicture = (req, res) => {
  const uid = req.user.id;

  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }

    let update = { photo: req.file.location };

    Users.findByIdAndUpdate(uid, update, { new: true })
      .then((user) => res.redirect("/users/me"))
      .catch((err) => res.status(400).json({ success: false, error: err }));
  });
};

module.exports = {
  loginPage,
  userDashboard,
  singleUser,
  loadUsers,
  registerPage,
  signUpUser,
  deleteUser,
  updateUser,
  uploadProfilePicture,
  allUsersPage,
};
