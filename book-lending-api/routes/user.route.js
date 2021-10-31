const { getAllUsers, getOneUser, getUserBorrowedBooks, deleteUser } = require('../controllers/user.controller');

const findAllUsers = (data, callback) => {
	const headers = ['get', 'delete'];
	if (headers.indexOf(data.method) === -1)
		return callback(404, {
			message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
		});

	if (data.method === 'get') getAllUsers(data, callback);
	else data.method === 'delete' && deleteUser(data, callback);
};

const findOneUser = (data, callback) => {
	const headers = ['get'];
	if (headers.indexOf(data.method) === -1)
		return callback(404, {
			message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
		});
	if (!data.query.status) data.method === 'get' && getOneUser(data, callback);
	else data.method === 'get' && getUserBorrowedBooks(data, callback);
};

// const removeUser = (data, callback) => {
// 	const headers = ['delete'];
// 	if (headers.indexOf(data.method) === -1)
// 		return callback(404, {
// 			message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
// 		});

// 	data.method === 'delete' && deleteUser(data, callback);
// };

module.exports = { findAllUsers, findOneUser, removeUser };
