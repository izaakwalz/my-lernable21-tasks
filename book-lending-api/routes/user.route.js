const { getAll, lendBook } = require('../controllers/user.controller');

route = {};

module.exports = (data, callback) => {
	const headers = ['post', 'get', 'put', 'delete'];
	if (headers.indexOf(data.method) === -1)
		return callback(404, {
			message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
		});
	route[data.method](data, callback);
};

route.get = (data, callback) => getAll(data, callback);

route.put = (data, callback) => lendBook(data, callback);
