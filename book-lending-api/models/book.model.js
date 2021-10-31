const factory = require('../services/factory.service');

class Book {
	async updateBook(id) {
		const book = await factory.findById('books', id, (err, result) => (err ? callback(err) : result));

		const books_not_a = (await factory.findAll('users')).map((user) =>
			user.borrowed_books.filter((_book) => _book.book_id === '03d9879757a2aa70d901')
		).length;

		const new_book = { ...book };

		--new_book.available_copies;
		book.available_copies === 0 ? (new_book.available_to_lend = false) : true;
		book.available_to_lend === false ? (new_book.status = 'unavailable') : 'available';

		await factory.update('books', id, new_book, (err, result) => {
			if (err) callback(err);
			else return;
		});
	}
}
