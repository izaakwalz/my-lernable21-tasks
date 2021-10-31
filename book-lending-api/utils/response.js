/**
 * Returns response object
 * @param {string} message Response message
 * @param {*} data Data to be returned
 */

const response = (message, data, success) => {
	return {
		message: message,
		success: success == null ? true : success,
		data: data || null,
	};
};

module.exports = response;
