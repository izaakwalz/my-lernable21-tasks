const colors = require('colors');

const { User, Book } = require('./models');

class Store {
	constructor() {
		this.users = [];
		this.books = [];
	}

	getUser(email) {
		const user = this.users.find((user) => user.email === email);

		return user;
	}
	/**
	 *
	 * @param {*} id find book by id
	 * @returns book object
	 */
	findById(id) {
		const book = this.books.find((_book) => _book.id === id);

		if (book == undefined) return console.log(`Error: please select a valid id from the catalog`.red.bold);

		return book;
	}

	register(data) {
		const user = this.getUser(data.email);
		if (user == undefined) this.users.push(new User(data));
		if (user) return console.log('USER ERROR: this user is already registered'.red.bold);
		return data;
	}

	add(data) {
		this.books.push(new Book(data));
	}

	listbooks() {
		return this.books;
	}

	lendBoook(email, id) {
		const user = this.getUser(email);

		const book = this.findById(id);

		if (user == undefined) return;

		if (book == undefined) return;

		user.books.push(book);
		book.is_lendable = false;
		return book;
	}

	returnBook(id, email) {
		const user = this.getUser(email);
		const book = this.findById(id);

		if (book == undefined) return;

		book.is_lendable = true;

		user.books.map((book, index) => {
			if (book.id == id) this.books.splice(index, 1);
		});

		return console.log(`Successfully returned the Book With this ${id}`.green.bold);
	}

	delete(id) {
		this.books.map((book, index) => {
			if (book.id === id) this.books.splice(index, 1);
		});

		return console.log(`Successfully removed the Book With this ${id}`.green.bold);
	}

	getUserBooks(email) {
		const user = this.getUser(email);
		if (user === undefined) return;
		if (user.books.length === 0) console.log("You don'nt have any book in your libary borrow one".yellow.bold);

		return user.books;
	}
}

module.exports = new Store();
