const factory = require('../services/factory.service');
const response = require('../utils/response');
// const { validate, validateEmail, hashPassword, encrypt, comparePassword } = require('../utils/helper');

const AuthMiddleware = require('../utils/auth.middleware');

const getAll = async (data, callback) => {
	const authUser = await AuthMiddleware([2], data, callback);
	if (!authUser) return;
	// console.log(authUser);

	const users = (await factory.findAll('users')).map((user) => delete user.password && user);
	callback(200, response('All Users', users));
};

module.exports = { getAll };
