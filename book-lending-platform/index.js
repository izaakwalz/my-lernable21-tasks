const prompt = require('prompt-sync')({ sigint: true });
const store = require('./services');

store.add({
	isbn: '0451163616',
	title: 'The Shining',
	description:
		'Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta.',
	author: 'Stephen King',
});

store.add({
	isbn: '2263002619',
	title: 'The Iron Heel',
	description:
		'Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta.',
	author: 'Jack London',
});

let profile;

const register = () => {
	const name = prompt('⁑⁎ enter your name : ');
	const email = prompt('⁑⁎ enter your email address : ');

	if (name === '' || email === '')
		return console.log('WARNING: One or more field is missing please try again'.yellow);

	const user = store.register({ name, email });
	profile = user;
	return user;
};

const getBooks = () => {
	console.log('⁑⁎ LIBARY BOOKS'.blue.bold);
	const books = store.listbooks();
	return books.forEach((book) =>
		console.log(
			`⁑⁎ ID :  ${book.id}, ${book.title.toUpperCase()} written by ${book.author.toUpperCase()} `.magenta.bold
		)
	);
};

const myBooks = () => {
	console.log('⁑⁎ MY BORROWED BOOKS'.blue.bold);
	const email = prompt('⁑⁎ enter your email : ');
	if (store.getUser(email) === undefined)
		return console.log('USER ERROR: user does not exits please register'.red.bold);

	const books = store.getUserBooks(email);
	return books.forEach((book) =>
		console.log(
			`⁑⁎ ID :  ${book.id}, ${book.title.toUpperCase()} written by ${book.author.toUpperCase()} `.magenta.bold
		)
	);
};

const borrowBook = () => {
	getBooks();
	console.log('※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);

	const email = prompt('⁑⁎ enter your email : ');
	const id = parseInt(prompt('⁑⁎ Select the ID of the Book you want: '));
	if (store.getUser(email) === undefined)
		return console.log('USER ERROR: user does not exits please register'.red.bold);
	const book = store.lendBoook(email, id);

	if (book === undefined) return;

	console.log(`⁑⁎ You just borrowed ${book.title.toUpperCase()} by ${book.author.toUpperCase()}`.green);
};

const returnBook = () => {
	const email = prompt('⁑⁎ enter your email : ');
	const id = parseInt(prompt('⁑⁎ Select the ID of the Book you want to return: '));

	if (store.getUser(email) === undefined)
		return console.log('USER ERROR: user does not exits please register'.red.bold);

	const book = store.findById(id);

	if (book === undefined) return;

	store.returnBook(id, email);
};

const addBook = () => {
	const title = prompt('⁑⁎  enter the title of the book : ');
	const author = prompt('⁑⁎  enter the title of the book : ');
	const description = prompt('⁑⁎  enter the title of the book : ');
	store.add({ title, author, description });
	console.log('Book added Succesfully thankyou'.green.bold);
};

function app() {
	console.log('※※※※※※※※※※※※※※※  WELCOME TO BOOKLEND LIBARY  ※※※※※※※※※※※※※※※'.blue);

	let menu =
		`\n ⁑⁎ MAIN MENU:> \n 1. REGISTER  \n 2. VIEW CATALOG \n 3. BORROW a BOOK \n 4. RETURN a BOOK \n 5. VIEW BORROWED BOOKS \n 6. ADD a BOOK \n 7. QUIT`
			.yellow;

	console.log(menu);

	if (store.users.length > 0) {
		const userProfile = `\n  ⁑⁎ username: ${profile.name} email: ${profile.email}`.magenta;
		console.log(userProfile);
	}

	console.log('\n※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);

	let userChoice = prompt('⁑⁎ What do you want to do? (enter a number) '.yellow.bold);

	while (userChoice !== '7') {
		if (userChoice === '1') {
			const data = register();
			console.log(`Welcome to BookLend ${data.name.toString()}!`.green.bold);

			userChoice = prompt('⁑⁎ Press 8 to return to the menu '.yellow.bold);
		} else if (userChoice === '2') {
			console.log('\n※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);
			getBooks();
			console.log('\n※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);
			userChoice = prompt('\n ⁑⁎ Press * to delete a BOOK or  press 8 to return to the menu '.yellow.bold);
		} else if (userChoice === '3') {
			borrowBook();

			userChoice = prompt('⁑⁎ Press 8 to return to the menu '.yellow.bold);
		} else if (userChoice === '4') {
			console.log('※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);
			returnBook();
			console.log('※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);
			userChoice = prompt('⁑⁎ Press 8 to return to the menu '.yellow.bold);
		} else if (userChoice === '5') {
			console.log('\n※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);
			myBooks();
			console.log('\n※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);
			userChoice = prompt('⁑⁎ Press 8 to return to the menu '.yellow.bold);
		} else if (userChoice === '6') {
			addBook();
			userChoice = prompt('⁑⁎ Press 8 to return to the menu '.yellow.bold);
		} else if (userChoice === '*') {
			console.log('\n※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);
			const id = parseInt(prompt('enter the ID of the book you want to delete '.yellow.bold));
			const book = store.findById(id);

			if (book === undefined) return;
			store.delete(id);
			console.log('\n※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※'.blue);

			userChoice = prompt('⁑⁎ Press 8 to return to the menu or * to Delete another Book'.yellow.bold);
		} else if (userChoice === '8') app();
		else {
			console.log('⁑⁎ input not valid'.red.bold);

			userChoice = prompt('⁑⁎ Press 8 to return to the menu '.yellow.bold);
		}
	}
}

app();
