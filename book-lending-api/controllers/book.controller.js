const Book = require('../services/factory.service');
const response = require('../utils/response');
const { validate } = require('../utils/helper');
const AuthMiddleware = require('../utils/auth.middleware');

const getAll = async (data, callback) => {
	const books = await Book.findAll('books');

	callback(200, response('All Books', books));
	// await Book.findAll('books', (err, books) => {
	// 	if (err) callback(400, err);
	// 	else callback(200, response('All Books', books));
	// });
};

const getOne = async (data, callback) => {
	const id = data.query.id;
	if (id.length !== 20 || id.length < 20)
		return callback(400, response(`Invalid ID - ${id}, must be a string of 20 charaters`, null, false));

	await Book.findById('books', `${id}`, (err, book) => {
		if (err) callback(404, err);
		else callback(200, response('book retrieved', book));
	});
};

const createBook = async (data, callback) => {
	const authUser = await AuthMiddleware([2], data, callback);
	if (!authUser) return;

	const { tittle, author, description, cover_image_url, isbn, copies_available, categories } = data.payload;

	if (
		validate(tittle, 'string') === false ||
		validate(author, 'string') === false ||
		validate(description, 'string') === false ||
		validate(copies_available, 'number') === false ||
		(categories && !validate(categories, 'string'))
	)
		return callback(400, response('one or more field is missing', null, false));
	const new_categories = categories && categories.split(',').map((cataegory) => cataegory.trim());

	const book = {
		tittle,
		author,
		cover_image_url: cover_image_url ?? 'no-image',
		description,
		categories: new_categories ?? [],
		isbn: isbn ?? '',
		status: copies_available > 0 ? 'available' : 'unavailable',
		copies_available: copies_available ?? 0,
		copies_lended: 0,
	};

	await Book.create('books', book, (err, result) => {
		if (err) callback(404, err);
		else callback(200, response('book added successfully', result));
	});
};

const updateBook = async (data, callback) => {
	const authUser = await AuthMiddleware([2], data, callback);
	if (!authUser) return;

	const id = data.query.id;
	if (id.length !== 20 || id.length < 20)
		return callback(400, response(`Invalid ID - ${id}, must be a string of 20 charaters`, null, false));

	const { tittle, author, description, cover_image, isbn, copies_available, categories, copies_lended } =
		data.payload;

	if (
		(tittle && !validate(tittle, 'string')) ||
		(isbn && !validate(tittle, 'string')) ||
		(author && !validate(author, 'string')) ||
		(cover_image && !validate(cover_image, 'string')) ||
		(description && !validate(description, 'string')) ||
		(copies_available && !validate(copies_available, 'number')) ||
		(copies_lended && !validate(copies_lended, 'number')) ||
		(categories && !validate(categories, 'string'))
	)
		return callback(400, response('one or more field is missing', null, false));
	// current book data
	const book = await Book.findById('books', id, (err, result) => (err ? callback(404, err) : result));

	// convert string to an array of strngs
	const new_categories = categories && categories.split(',').map((cataegory) => cataegory.trim());

	const update_book = { ...book };

	// const update_book = {
	(update_book.tittle = tittle ?? book.tittle),
		(update_book.author = author ?? book.author),
		(update_book.cover_image_url = cover_image ?? book.cover_image_url),
		(update_book.description = description ?? book.description),
		(update_book.categories = new_categories ?? book.categories),
		(update_book.isbn = isbn ?? book.isbn),
		(update_book.status = copies_available > 0 ? 'available' : 'unavailable'),
		(update_book.copies_available = copies_available ?? book.copies_available),
		(update_book.copies_lended = copies_lended ?? book.copies_lended),
		// };

		await Book.update('books', book._id, update_book, (err, result) => {
			if (err) return callback(404, err);
			else callback(200, response('book updated successfully', result));
		});
};

const deleteBook = async (data, callback) => {
	const authUser = await AuthMiddleware([2], data, callback);
	if (!authUser) return;

	const id = data.query.id;
	if (id.length !== 20 || id.length < 20)
		return callback(400, response(`Invalid ID - ${id}, must be a string of 20 charaters`, null, false));

	await Book.remove('books', `${id}`, (err) => {
		if (err) callback(404, err);
		else callback(200, response(`book ${id} deleted successfully`, null));
	});
};

module.exports = { getAll, getOne, createBook, updateBook, deleteBook };
