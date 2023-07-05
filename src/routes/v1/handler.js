const books = require("../../database");
const { nanoid } = require("nanoid");

const index = () => {
  return "ini halaman index";
};

const getAllBooks = (request, handler) => {
  const allBooks = books;

  const hasilMap = allBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = handler.response({
    status: "success",
    data: {
      books: hasilMap,
    },
  });

  response.code(200);
  return response;
};

const getBookById = (request, handler) => {
  const { bookId } = request.params;
  console.log(bookId);
  console.log(books);
  const index = books.filter((book) => book.id === bookId)[0];
  console.log(index);

  if (index !== undefined) {
    const response = handler.response({
      status: "success",
      data: {
        book: index,
      },
    });

    response.code(200);
    return response;
  }

  const response = handler.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);
  return response;
};

const insertNewBook = (request, handler) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    console.log("tidak ada");
    const response = handler.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    console.log("halaman tidak valid");
    const response = handler.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  let finished = false;

  if (pageCount === readPage) {
    finished = true;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    console.log("isi var success", isSuccess);
    console.log("isi newBook", newBook);
    const response = handler.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }
};

const updateBookById = (request, handler) => {
  const { bookId } = request.params;
  console.log("parameter update: ", bookId);

  const index = books.findIndex((book) => book.id === bookId);
  console.log("findIndex:", index);

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  console.log("data payload: ", name);

  if (!name) {
    const response = handler.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = handler.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  if (index === -1) {
    const response = handler.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });

    response.code(404);
    return response;
  }

  const updatedAt = new Date().toISOString();

  // books[index] = {
  //   ...books[index],
  //   name,
  //   year,
  //   author,
  //   summary,
  //   publisher,
  //   finished: pageCount === readPage,
  //   pageCount,
  //   reading,
  //   updatedAt,
  // };

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    readPage,
    finished: pageCount === readPage,
    pageCount, // kurang yg ini
    reading,
    updatedAt,
  };

  const book = books.filter((book) => book.id === bookId)[0];

  const response = handler.response({
    status: "success",
    message: "Buku berhasil diperbarui",
    data: {
      book: book,
    },
  });

  response.code(200);
  return response;
};

const deleteById = (request, handler) => {
  const { bookId } = request.params;
  console.log("book id:", bookId);

  const book = books.filter((book) => book.id === bookId)[0];
  console.log("hasil filter:", book);

  if (!book) {
    const response = handler.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });

    response.code(404);
    return response;
  }

  console.log("before:", books);
  books.splice(index, 1);
  console.log("after:", books);

  const response = handler.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });

  response.code(200);
  return response;
};

module.exports = {
  index,
  getAllBooks,
  getBookById,
  insertNewBook,
  updateBookById,
  deleteById,
};
