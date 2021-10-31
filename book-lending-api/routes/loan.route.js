const { loanBook, returnBorrowedBook } = require('../controllers/loan.controller');

const lendBook = (data, callback) => {
	const headers = ['patch'];
	if (headers.indexOf(data.method) === -1)
		return callback(404, {
			message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
		});

	data.method === 'patch' && loanBook(data, callback);
};

const returnBook = (data, callback) => {
	const headers = ['patch'];
	if (headers.indexOf(data.method) === -1)
		return callback(404, {
			message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
		});

	data.method === 'patch' && returnBorrowedBook(data, callback);
};

module.exports = { lendBook, returnBook };
