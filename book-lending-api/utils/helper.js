const { randomBytes, createHmac, scryptSync, createCipheriv, createDecipheriv } = require('crypto');

/**
 *
 * @param {number} strLength the length of the string
 * @returns string
 */
exports.generateId = (strLength) => {
	return randomBytes(strLength ?? 10).toString('hex');
};

/**
 *
 * @param {*} value - email to validate
 * @returns boolean
 */
exports.validateEmail = (value) => {
	return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/.test(value.trim()); // email validation
};

/**
 * Validates the payload of a post method
 * @param {*} value - paylod key to validate
 * @param {*} check - data type to check e.g(typeof name === "string")
 * @returns boolean
 */
exports.validate = (value, check) => {
	if (check === 'string') return typeof value === check && value.trim().length > 0;
	else if (check === 'number') return typeof value === check;
	else return typeof value === check;
};
/**
 * Hash Password,
 * create a salt and a hash for a usser password
 * @param {string} password - the password of the acepted user
 * @returns - string
 */
exports.hashPassword = (password) => {
	const salt = randomBytes(16).toString('hex');
	const hash = createHmac('sha256', salt).update(password).digest('base64');

	return `${salt}.${hash}`;
};

exports.expiresIn = (time) => {
	const today = new Date();
	const expire_time = today.getTime() + time;
	const future_date = new Date();

	const new_time = future_date.setTime(expire_time);

	return new Date(new_time).toISOString();
};

/**
 * Compare Password
 * Creates a hash and compare it with already exsitng user's password,
 * if the hash match it returs true if not false.
 * @param {string} password - the user password with a hash and salt
 * @param {string} comparePassword - the password of the user trying to login
 * @returns boolean
 */
exports.comparePassword = (password, comparePassword) => {
	const is_user_password = password.split('.');
	const salt = is_user_password[0]; // salt gotten form the user password
	const hash = createHmac('sha256', salt).update(comparePassword).digest('base64'); // creating a hash

	return hash === is_user_password[1]; // comparing hash with users password
};

/**
 * Encrypt
 * sings and create secret key  to encrypt data
 * @param {string} password - the user password
 * @param {*} data - data to encrypt
 * @param {function} callback  - callvack function
 * @returns string
 */
exports.encrypt = (password, data, callback) => {
	try {
		const algorithm = 'aes-256-cbc';

		const secret = scryptSync(password, 'xx-xxx-xxxx', 32); //  password-based key with 256-bits
		const init_vector = randomBytes(16); // Initialization vector.
		const cipher = createCipheriv(algorithm, secret, init_vector);

		const object_data = JSON.stringify(data);

		let encrypted = cipher.update(`${object_data}`, 'utf8', 'base64');
		encrypted += cipher.final('base64');

		const hash_secret = secret.toString('base64');
		const hash_vector = init_vector.toString('base64');
		return callback(false, `${hash_secret}.${encrypted}.${hash_vector}`);
	} catch (error) {
		callback(error.message);
	}
};
/**
 * Decrypt
 * verify the encrypted data sent to the user and decrypt it
 * @param {string} token - the token assinged to the user
 * @param {function} callback -  callback function
 * @returns object
 */
exports.decrypt = (token, callback) => {
	try {
		const hash_token_vector = token.split('.');
		const algorithm = 'aes-256-cbc';
		const secret = Buffer.from(hash_token_vector[0], 'base64'); // encryted password
		const encrypted = hash_token_vector[1]; // encrypted data
		const inint_vector = Buffer.from(hash_token_vector[2], 'base64'); // Initialization vector.

		const decipher = createDecipheriv(algorithm, secret, inint_vector);

		let decrypted = decipher.update(encrypted, 'base64', 'utf8');
		decrypted += decipher.final('utf8');
		return callback(false, JSON.parse(decrypted));
	} catch (error) {
		callback(error.message);
	}
};
