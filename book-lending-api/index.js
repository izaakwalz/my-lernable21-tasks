/**
 * Entry file to out application
 */
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routeHandler = require('./routes');

const server = http.createServer((req, res) => {
	const method = req.method.toLowerCase();
	const current_url = url.parse(req.url, true);
	const pathname = current_url.pathname;
	const query = current_url.query;
	const trimed_path = pathname.replace(/^\/+|\/+$/g, '');
	const headers = req.headers;

	const decoder = new StringDecoder('utf-8');
	let buffer = '';

	req.on('data', (chunk) => (buffer += decoder.write(chunk)));

	req.on('end', () => {
		decoder.end();

		const payload = buffer && JSON.parse(buffer);

		const data = {
			url: current_url,
			method,
			query,
			trimed_path,
			headers,
			pathname,
			payload,
		};

		const handler = typeof router[trimed_path] !== 'undefined' ? router[trimed_path] : routeHandler.notfound;

		handler(data, (statusCode, result) => {
			statusCode = typeof statusCode === 'number' ? statusCode : 200;

			res.writeHead(statusCode, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(result));

			const status_message = res.statusMessage;
			const status_code = res.statusCode;

			console.log(`${method.toUpperCase()} - ${trimed_path} - ${status_code} - ${status_message}`);
		});
	});
});

const router = {
	'': routeHandler.ping,
	'api/v1/auth/register': routeHandler.auth.register,
	'api/v1/auth/login': routeHandler.auth.login,
	'api/v1/users': routeHandler.users,
	'api/v1/books': routeHandler.books,
	'api/v1/users/lend': routeHandler.loan.lendBook,
	'api/v1/users/return': routeHandler.loan.returnBook,
};

const PORT = process.env.PORT ?? 4000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT} @ http://localhost:${PORT}`));
