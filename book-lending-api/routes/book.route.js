const { getAll, getOne, createBook, updateBook, deleteBook } = require('../controllers/book.controller');

const route = {};
/**
 * BOOK CRUD ROUTE
 * @param {object} data
 * @param {function} callback
 * @returns
 */
module.exports = (data, callback) => {
	const headers = ['post', 'get', 'patch', 'delete'];
	if (headers.indexOf(data.method) === -1)
		return callback(404, {
			message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
		});
	route[data.method](data, callback);
};

//  GET all books /api/v1/books |
//  GET one book /api/v1/books?id= your_id
//  access public
route.get = (data, callback) => {
	if (data.method === 'get' && !data.query.id) getAll(data, callback);
	// all books
	else getOne(data, callback); // find one book
};
// Create a book
// POST - /api/v1/books
// access private
route.post = (data, callback) => createBook(data, callback);

// Update a book
// PATCH - /api/v1/books
// access private
route.patch = (data, callback) => updateBook(data, callback);

// Remove a book
// DELETE - /api/v1/books
// access private
route.delete = (data, callback) => deleteBook(data, callback);
