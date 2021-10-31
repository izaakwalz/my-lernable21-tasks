const User = require('../services/factory.service');
const response = require('../utils/response');
// const { validate, validateEmail, hashPassword, encrypt, comparePassword } = require('../utils/helper');

const AuthMiddleware = require('../utils/auth.middleware');

const getAllUsers = async (data, callback) => {
	const authUser = await AuthMiddleware([2], data, callback);
	if (!authUser) return;

	const users = (await User.findAll('users')).map((user) => delete user.password && user);
	callback(200, response('All Users', users));
};

const getOneUser = async (data, callback) => {
	const authUser = await AuthMiddleware([1, 2], data, callback);
	if (!authUser) return;

	await User.findById('users', `${authUser._id}`, (err, book) => {
		if (err) callback(404, err);
		else callback(200, response('user retrieved', book));
	});
};

const getUserBorrowedBooks = async (data, callback) => {
	const authUser = await AuthMiddleware([1, 2], data, callback);
	if (!authUser) return;

	const status = data.query.status;

	const borrowed_book = authUser.borrowed_books.find((book) => book.status === status);
	console.log(borrowed_book);
	callback(200, response('My Borrowed Books', borrowed_book));
};

const deleteUser = async (data, callback) => {
	const authUser = await AuthMiddleware([2], data, callback);
	if (!authUser) return;

	const id = data.query.id;
	if (id.length !== 20 || id.length < 20)
		return callback(400, response(`Invalid ID - ${id}, must be a string of 20 charaters`, null, false));

	await User.remove('users', `${id}`, (err) => {
		if (err) callback(404, err);
		else callback(200, response(`user - ${id} deleted successfully`, null));
	});
};

module.exports = { getAllUsers, getOneUser, getUserBorrowedBooks, deleteUser };
