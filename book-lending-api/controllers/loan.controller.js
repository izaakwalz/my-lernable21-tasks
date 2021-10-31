const AuthMiddleware = require('../utils/auth.middleware');
const factory = require('../services/factory.service');
const { generateId, expiresIn } = require('../utils/helper');
const response = require('../utils/response');

const loanBook = async (data, callback) => {
	const authUser = await AuthMiddleware([1, 2], data, callback); // auththentication and authorization moddleware
	if (!authUser) return;

	const id = data.query.id;
	// 1)  check if the query id is valid or not and retrn amessage
	if (id.length !== 20 || id.length < 20)
		return callback(400, { message: 'ID is not valid and must be a string of 20 charaters' });

	// 2) == get all books and find a book by the query id
	const book = await (await factory.findAll('books')).find((book) => book._id === id);
	//    if it's not return and error
	if (!book) return callback(404, response(`Sorry, we don't have any book with this ${id} `, null, false));

	// 3) === checking if there is any copies available
	if (book.copies_available < 1)
		return callback(400, response(`Sorry, there are no copies left of ${book.tittle} to lend`, null, false));

	//  4) ==== checking if user is still with the book
	const borrowed_books = authUser.borrowed_books.find((book) => book.status === 'pending' && book.book_id === id);
	// console.log(borrowed_books);

	if (borrowed_books) return callback(400, response('This book is loaned to you', null, false));

	// 5) ===== Getting user data to update
	const user_to_update = await factory.findById('users', authUser._id, (err, result) =>
		err ? callback(404, err) : result
	);
	// 6 ) ====== Getting book data to update
	const book_to_update = await factory.findById('books', id, (err, result) => (err ? callback(404, err) : result));

	const update_borrowed_books = { ...user_to_update }; // updating user borrowed_books by patching in some data
	const update_book = { ...book_to_update }; // updating book

	// 7) granting user access to the book
	update_borrowed_books.borrowed_books.push({
		borrower_id: generateId(),
		book_id: book._id, // book id
		tittle: book.tittle, // book title
		status: 'pending', //  the request status
		issued_Date: new Date().toISOString(),
		return_date: null,
		due_date: expiresIn(3 * 60 * 60 * 1000), // 3hrs
	});
	--update_book.copies_available; // decrease available copies of books
	update_book.copies_available > 0 ? 'available' : 'unavailable';
	update_book.copies_lended++; // increase the number of borrowers

	await factory.update('books', book._id, update_book, (err, result) => {
		if (err) callback(404, err);
		else return;
	});

	await factory.update('users', user_to_update._id, update_borrowed_books, (err, result) => {
		if (err) return callback(404, err);
		delete result.password;
		callback(200, response('Book lended successfully', result.borrowed_books));
	});
};

const returnBorrowedBook = async (data, callback) => {
	const authUser = await AuthMiddleware([1, 2], data, callback); // auththentication and authorization moddleware
	if (!authUser) return;

	const id = data.query.id;
	// 1) check if the query id is valid or not and retrn amessage
	if (id.length !== 20 || id.length < 20)
		return callback(400, { message: 'ID is not valid and must be a string of 20 charaters' });

	const book = await (await factory.findAll('books')).find((_book) => _book._id === id);
	// console.log(book);
	if (!book) return callback(404, response(`Sorry, we don't have any book with this ${id} `, null, false));

	const borrowed_book = authUser.borrowed_books.find((book) => book.status === 'pending' && book.book_id === id);

	if (!borrowed_book)
		return callback(
			400,
			response(`Book - ${book.tittle && book.tittle} is not in your pending list of returns`, null, false)
		);

	const user_to_update = await factory.findById('users', authUser._id, (err, result) =>
		err ? callback(404, err) : result
	);
	// 6 ) ====== Getting book data to update
	const book_to_update = await factory.findById('books', id, (err, result) => (err ? callback(404, err) : result));

	const update_borrowed_books = { ...user_to_update }; // updating user borrowed_books by patching in some data
	const update_book = { ...book_to_update }; // updating book

	if (book.copies_lended > 0) {
		update_book.copies_lended-- && update_book.copies_available++;
		update_book.copies_available > 0 ? 'available' : 'unavailable';
		// update_borrowed_books.borrowed_books.find(_book => _book.status === "pending" )
		const libary_book = update_borrowed_books.borrowed_books.find(
			(_book) => _book.status === 'pending' && _book.book_id === book._id
		);
		// const return_book = { ...libary_book };

		libary_book.status = 'closed';
		libary_book.return_date = new Date().toISOString();

		await factory.update('books', book._id, update_book, (err, result) => {
			if (err) callback(404, err);
			else return;
		});

		await factory.update('users', user_to_update._id, update_borrowed_books, (err, result) => {
			if (err) return callback(404, err);
			delete result.password;
			callback(200, response('Book returned successfully', result.borrowed_books));
		});
	}
};

module.exports = { loanBook, returnBorrowedBook };
