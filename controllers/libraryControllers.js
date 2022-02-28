const Books = require("./../models/BookModel");
const Users = require("./../models/User");
// GET request to home page /
const homePage = (req, res) => {
  try {
    res.render("index", { title: "Libray Home page" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET request to /books
const loadBooks = async (req, res) => {
  try {
    const books = await Books.find();
    // console.log(books);
    res.render("books", { title: "Libray | Books List", books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET request to /books/id
const loadSingleBook = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);

    res.render("book", { title: "Searching Book", book });
  } catch (error) {
    res.render("pageNotFound");
  }
};

// POST request to /books
const submitBook = async (req, res) => {
  try {
    const newBook = new Books({
      title: req.body.title,
      subtitle: req.body.subtitle,
      author: req.body.author,
      published: req.body.published,
      publisher: req.body.publisher,
      pages: req.body.pages,
      description: req.body.description,
      website: req.body.website,
      isbn: req.body.isbn,
      numberInStock: req.body.numberInStock,
    });

    await newBook.save();

    res.redirect("/books");
  } catch (error) {
    console.log(error._message);
    res.render("pageNotFound", { error, status: 500 });
  }
};

// update book, POST /books/id

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateBook) {
      return;
    }
    await updatedBook.save();

    res.redirect("/books");
  } catch (error) {
    console.log(error._message);
    res.render("pageNotFound", { error, status: 500 });
  }
};

// DELETE BOOK DELETE /books/id
const removeBook = async (req, res) => {
  try {
    await Books.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (error) {
    console.log(error._message);
    res.render("pageNotFound", { error, status: 500 });
  }
};

module.exports = {
  homePage,
  loadBooks,
  submitBook,
  loadSingleBook,
  updateBook,
  removeBook,
};
