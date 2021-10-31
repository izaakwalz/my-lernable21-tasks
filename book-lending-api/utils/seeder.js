const fs = require('fs').promises;
const crypto = require('crypto');

let num = 2;
for (let book of books) {
	const data = {
		tittle: book.title,
		author: book.author.name,
		cover_image_url: book.image_url,
		description: book.description,
		categories: book.categories,
		isbn: book.isbn ?? crypto.randomBytes(4).toString('hex'),
		status: 'available',
		copies_available: 2,
		copies_lended: 0,
	};
	const randomString = crypto.randomBytes(10).toString('hex');
	const document = {
		_id: randomString,
		...data,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	fs.writeFile(`./data/books/${randomString}.json`, JSON.stringify(document), 'utf-8');
}
