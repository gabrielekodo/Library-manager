const express = require("express");
const router = express.Router();
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
} = require("./../controllers/usersController");
const { login, register, protect } = require("./../controllers/authController");

router.route("/").get(homePage);
router.get("/logout", function (req, res) {
  res.clearCookie("jwt");
  res.redirect("/");
});
router.route("/login").get(loginPage).post(login);
router.route("/register").get(registerPage).post(register);

router.route("/books").get(protect, loadBooks).post(protect, submitBook);
router.route("/users/dashboard").get(protect, userDashboard);
router
  .route("/books/:id")
  .get(loadSingleBook)
  .patch(updateBook)
  .delete(removeBook);
module.exports = router;
