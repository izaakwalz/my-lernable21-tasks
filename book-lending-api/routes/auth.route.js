const { createUser, loginUser } = require('../controllers/auth.controller');

/**
 * REGISTES A NEW USER
 * @param {object} data
 * @param {function} callback
 * @returns
 */
const register = (data, callback) => {
	const headers = ['post'];
	if (headers.indexOf(data.method) === -1)
		return callback(404, {
			message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
		});

	data.method === 'post' && createUser(data, callback);
};
/**
 * USER LOGIN
 * @param {object} data
 * @param {function} callback
 * @returns
 */
const login = (data, callback) => {
	// const route = {};
	// route.post = (data, callback) => loginUser(data, callback);
	const headers = ['post'];
	if (headers.indexOf(data.method) === -1)
		return callback(404, {
			message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
		});
	data.method === 'post' && loginUser(data, callback);
	// route[data.method](data, callback);
};

module.exports = { register, login };
