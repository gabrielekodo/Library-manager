const multer = require("multer");
const upload = multer({ dest: `../public/uploads` });
// const { uploadFile, getFileStream } = require("./../controllers/S3");

const {
  homePage,
  loadBooks,
  submitBook,
  loadSingleBook,
  updateBook,
  removeBook,
} = require("./../controllers/libraryControllers");
const {
  loginPage,
  registerPage,
  userDashboard,
  loadUsers,
  singleUser,
  signUpUser,
  deleteUser,
  updateUser,
} = require("./../controllers/usersController");
const {
  login,
  register,
  protect,
  loggedIn,
  logout,
  restrictedTo,
} = require("./../controllers/authController");

const express = require("express");
const router = express.Router();
// router.use(loggedIn);

router.route("/").get(homePage);

router.get("/logout", logout);
router.route("/login").get(loginPage).post(login);
router.route("/register").get(registerPage).post(register);

// USERS API
router
  .route("/api/v1/users")
  .get(protect, restrictedTo("admin"), loadUsers)
  .post(signUpUser);
router
  .route("/api/v1/users/:id")
  .get(protect, restrictedTo("admin"), singleUser)
  .delete(protect, restrictedTo("admin"), deleteUser)
  .patch(protect, restrictedTo("admin"), updateUser);
router.route("/users/me").get(protect, userDashboard);

// BOOKS API
router
  .route("/api/v1/books")
  .get(protect, loadBooks)
  .post(restrictedTo("admin"), submitBook);
router
  .route("/api/v1/books/:id")
  .get(protect, loadSingleBook)
  .patch(protect, restrictedTo("admin"), updateBook)
  .delete(protect, restrictedTo("admin"), removeBook);

// UPLOADING FILES to AWS S3 USING MULTER

// router.get("/books/uploads", (req, res) => {
//   res.render("images");
// });
// router.post("uploads", upload.single("image"), async (req, res) => {
//   const file = req.file;
//   // const bookCover = new Books({ image: file.originalname });
//   // await bookCover.save();
//   console.log(file, req.body);
//   const result = await uploadFile(file);
//   if (!result) console.log(" error during upload......");
//   console.log(result);

//   // deleting file from server after uploading to S3
//   await unlinkFile(file.path);
//   res.send({ imagePath: `/images/${result.Key}` });
// });

// // DOWNLOADING FROM S3
// router.get("/uploads/:key", (req, res) => {
//   const key = req.params.key;
//   const readStream = getFileStream(key);
//   readStream.pipe(res);
// });

module.exports = router;
