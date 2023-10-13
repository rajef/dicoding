const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
           
    const id = nanoid(16);    
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (pageCount === readPage) finished = true;
    else finished = false;
   
    if (!name){
      const responseReqBody = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        responseReqBody.code(400);
      return responseReqBody;
    }
  
    if (readPage > pageCount){
          const responsefailPage = h.response({
              status: 'fail',
              message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
          });
          responsefailPage.code(400);
          return responsefailPage;
    }

    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, finished, reading, id, insertedAt, updatedAt,
    };
   
    books.push(newBook);  
    
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }

    else  {
    const responsefailGen = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    responsefailGen.code(500);
    return responsefailGen;   
    } 

};

// const getAllBooksHandler = () => ({
//     status: 'success',
//     data: {
//       books,
//     },
// });

const getAllBooksHandler = (request, h) => {
  if (books === undefined) {
    const response = h.response ({
      status: 'success',
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
}

const getBooksByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response
    }
    
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBooksByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading,
        updatedAt,
      };
      
      if (name == undefined){
        const responseReqBody = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
          });
          responseReqBody.code(400);
        return responseReqBody;
        }
    
      else if (readPage > pageCount){
            const responsefailPage = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            responsefailPage.code(400);
            return responsefailPage;
        }

      else {
        const responseSuc = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });
        responseSuc.code(200);
        return responseSuc;
      }
    }
    
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBooksByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = books.findIndex((book) => book.id === id);
 
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBooksByIdHandler, deleteBooksByIdHandler};