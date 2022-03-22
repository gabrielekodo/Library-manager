const multer = require("multer");
const upload = multer();
const { uploadFile, getFileStream } = require("./../controllers/S3");
const { generateUploadURL } = require("./../controllers/S3directupload");

const {
  homePage,
  loadBooks,
  submitBook,
  loadSingleBook,
  updateBook,
  removeBook,
  booksListPage,
  singleBookPage,
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
  uploadProfilePicture,
  allUsersPage,
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
router.route("/login").get(loginPage);
router.route("/api/v1/users/login").post(login);
router.route("/register").get(registerPage).post(register);

// Users list

router
  .route("/users")
  .get(protect, restrictedTo("admin", "lib-assistant"), allUsersPage);

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
router.get("/users/me/updatepicture", protect, (req, res) => {
  res.status(200).render("updateprofilepic");
});

// Books page
router.route("/users/me/updatepicture").post(protect, uploadProfilePicture);
router.route("/books").get(protect, booksListPage);
router.route("/books/:id").get(protect, singleBookPage);
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

// router.post("/uploads", protect, upload.single("image"), async (req, res) => {
//   const file = req.file;
//   // const bookCover = new Books({ image: file.originalname });
//   // await bookCover.save();
//   console.log(file, req.body);
//   const result = await uploadFile(file);
//   if (!result) console.log(" error during upload......");
//   console.log(result);

//   // deleting file from server after uploading to S3
//   // await unlinkFile(file.path);
//   res.send({ imagePath: `/images/${result.Key}` });
// });

// // DOWNLOADING FROM S3
// router.get("/uploads/:key", protect, (req, res) => {
//   const key = req.params.key;
//   const readStream = getFileStream(key);
//   readStream.pipe(res);
// });

// // DIRECT UPLOAD TO S3 FROM FRONT END
// router.get("/S3url", protect, async (req, res) => {
//   try {
//     const url = await generateUploadURL();
//     console.log(url);
//     const imageUrl = url.split("?")[0];
//     res.json({ url, imageUrl });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ status: "fail", message: "something went wrong...." });
//   }
// });

module.exports = router;
