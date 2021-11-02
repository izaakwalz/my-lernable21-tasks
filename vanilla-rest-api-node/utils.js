const { rejects } = require('assert');
const fs = require('fs');

function writeDataToFile(filename, content) {
	fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
		if (err) {
			console.log(err);
		}
	});
}

const asyncHandler = (fn) => (req, res, next) => new Promise.resolve(fn(req, res, next).catch(next));

function getPostData(req) {
	return new Promise((resolve, reject) => {
		try {
			let body = '';

			req.on('data', (chunk) => {
				body += chunk.toString();
			});

			req.on('end', () => {
				resolve(body);
			});
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = { writeDataToFile, getPostData };
