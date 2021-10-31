const User = require('../services/factory.service');
const { decrypt } = require('./helper');
module.exports = async (roles = [], data, callback) => {
	if (!data.headers.authorization) return callback(401, { message: 'Unauthorized access: no access token' });

	const token = data.headers.authorization.split(' ')[1];
	const decoded = decrypt(token, (err, result) =>
		err ? callback(401, { message: 'Unauthorized access: invalid token' }) : result
	); // decrypt  token

	if (decoded === undefined) return;

	const user = await (await User.findAll('users')).find((user) => user._id === decoded.id);

	if (!user) return callback(401, { message: 'Unauthorized access: user does not exist' });
	delete user.password;

	if (!roles.includes(user.role))
		return callback(401, { message: 'Unauthorized access - you can not view this route 🚩' });
	return user;
};
