const express = require("express");
const { protect } = require("./controllers/authController");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const cookieParser = require("cookie-parser");

const multer = require("multer");
const upload = multer({ dest: `${__dirname}/public/uploads` });
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const expressLayouts = require("express-ejs-layouts");
const routes = require("./routes/libraryRoutes");
const morgan = require("morgan");

const { uploadFile, getFileStream } = require("./controllers/S3");
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

// UPLOADING FILES to AWS S3 USING MULTER

app.get("/uploads", protect, (req, res) => {
  res.render("images");
});
app.post("/uploads", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    console.log(file, req.body);
    const result = await uploadFile(file);
    console.log(result);

    // deleting file from server after uploading to S3
    await unlinkFile(file.path);
    res.send({ imagePath: `/images/${result.Key}` });
  } catch (error) {
    res.send("SOMETHING WENT WRONG, TRY TO LOGIN IN AGAIN");
  }
});

// DOWNLOADING FROM S3
app.get("/uploads/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

// ROUTES THAT DO NOT EXIST
app.all("*", (req, res, next) => {
  res.render("pageNotFound", { error: "Page requested is not available" });
  next();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
