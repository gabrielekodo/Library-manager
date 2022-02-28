const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    unique: true,
    required: [true, "ISBN number is required"],
  },
  title: {
    type: String,
    unique: true,
    required: [true, "Title is required"],
  },
  author: {
    type: String,

    required: [true, "Author is required"],
  },
  subtitle: {
    type: String,
    unique: true,
    maxlength: 100,
  },
  publisher: {
    type: String,

    required: [true, "Publisher is required"],
  },
  pages: {
    type: Number,

    required: [true, "number of pages is required"],
  },
  website: {
    type: String,
  },
  numberInStock: {
    type: Number,

    required: [true, "number in stock is required"],
  },
  description: {
    type: String,
    unique: true,
    required: [true, "Description is required"],
    maxlength: 350,
  },
  published: {
    type: Date,

    required: [true, "Publication date is required"],
  },
  image: {
    type: String,
    unique: true,
    default: "avatar",
  },
});

module.exports = mongoose.model("Books", bookSchema);
