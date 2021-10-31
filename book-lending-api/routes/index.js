const notfound = (data, callback) => {
	callback(404, {
		message: `Resource not found -> can not ${data.method.toUpperCase()} request to ${data.pathname}`,
	});
};
//  testing route
const ping = (data, callback) => {
	callback(200, 'SERVER IS RUNNING  🚨 🚨 🚨 🚨 ');
};
/**
 * All routes and methods
 */
module.exports = {
	ping,
	notfound,
	auth: require('./auth.route'),
	users: require('./user.route'),
	books: require('./book.route'),
	loan: require('./loan.route'),
};
