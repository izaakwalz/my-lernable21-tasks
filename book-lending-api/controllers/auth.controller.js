const User = require('../services/factory.service');
const response = require('../utils/response');
const { validate, validateEmail, hashPassword, encrypt, comparePassword } = require('../utils/helper');

const createUser = async (data, callback) => {
	const { name, email, password, role } = data.payload;
	if (
		validate(name, 'string') === false ||
		validate(email, 'string') === false ||
		validate(password, 'string') === false ||
		(role && validate(role, 'number') === false)
	)
		return callback(400, response('one or more field is missing credentials', null, false));

	if (validateEmail(email) === false) return callback(400, response('invalid email format', null, false));

	const user = await (await User.findAll('users')).find((user) => user.email === email);

	if (user) return callback(400, response('this user already exist'));

	const newUser = {
		name,
		email,
		password: hashPassword(password),
		borrowed_books: [],
		role: role ?? 1,
	};

	await User.create('users', newUser, (err, result) => {
		delete result.password;
		delete result.borrowed_books;
		const token = encrypt(password, { id: result._id, admin: result.role }, (err, result) =>
			err ? callback(400, err) : result
		);

		if (err) callback(404, err);
		else callback(201, response('user created successfully', { ...result, token }));
	});
};

const loginUser = async (data, callback) => {
	const { email, password } = data.payload;
	if (validate(email, 'string') === false) return callback(400, response('Email is required', null, false));
	if (validate(password, 'string') === false) return callback(400, response('Password is required', null, false));

	if (validateEmail(email) === false) return callback(400, response('invalid email format', null, false));

	const user = await (await User.findAll('users')).find((user) => user.email === email);

	if (!user) return callback(400, response('Incorrect email or password'));

	//Check if user password is correct
	const is_correct = comparePassword(user.password, password);
	if (!is_correct) return callback(400, response('Incorrect email or password'));

	const token = encrypt(password, { id: user._id, admin: user.role }, (err, result) =>
		err ? callback(400, err) : result
	);
	delete user.password;
	delete user.borrowed_books;
	return callback(200, response('Login successfull', { ...user, token }));
};

module.exports = { createUser, loginUser };
