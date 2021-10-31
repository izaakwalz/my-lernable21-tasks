class Book {
	/**
	 *
	 * @param {object} data
	 */
	constructor(data) {
		this.id = Math.floor(Math.random() * 2000 + 1000);
		this.title = data.title;
		this.isbn = data.isbn ?? '';
		this.description = data.description;
		this.author = data.author;
		this.categories = data.categories ?? [];
		this.is_lendable = true;
	}
}

class User {
	/**
	 *
	 * @param {object} data
	 */
	constructor(data) {
		this.id = Math.floor(Math.random() * 2000 + 1000);
		this.name = data.name;
		this.email = data.email;
		this.books = [];
	}
}

module.exports = { User, Book };
