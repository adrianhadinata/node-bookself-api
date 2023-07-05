const {
  index,
  getAllBooks,
  getBookById,
  insertNewBook,
  updateBookById,
  deleteById,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: index,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "POST",
    path: "/books",
    handler: insertNewBook,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookById,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteById,
  },
];

module.exports = routes;
