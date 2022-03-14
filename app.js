const express = require("express");
const { protect } = require("./controllers/authController");
const Books = require("./models/BookModel");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
const connectDB = require("./config/database");
const expressLayouts = require("express-ejs-layouts");
const routes = require("./routes/libraryRoutes");
const morgan = require("morgan");

dotenv.config({ path: "./config/config.env" });
const app = express();

//connect database
connectDB();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", routes);

app.use((req, res, next) => {
  // console.log(req.headers);
  next();
});
app.use("/", express.static(`${__dirname}/public`));

// ROUTES THAT DO NOT EXIST
app.all("*", (req, res, next) => {
  res.render("pageNotFound", { error: "Page requested is not available" });
  next();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
