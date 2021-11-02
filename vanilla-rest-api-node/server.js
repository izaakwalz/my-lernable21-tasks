const http = require('http');
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('./controllers/productController');
// const server = http.createServer((req, res) => {
// 	res.statusCode == 200;
// 	res.setHeader('Content-Type', 'text/html');
// 	res.write('<h1>Hello</h1>');
// 	res.end();
// });

const server = http.createServer((req, res) => {
	if (req.url === '/api/products' && req.method === 'GET') {
		getProducts(req, res);
	} else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
		const id = req.url.split('/')[3];
		getProduct(req, res, id);
	} else if (req.url === '/api/products' && req.method === 'POST') {
		createProduct(req, res);
	} else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
		const id = req.url.split('/')[3];
		updateProduct(req, res, id);
	} else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
		const id = req.url.split('/')[3];
		deleteProduct(req, res, id);
	} else {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ messdage: 'route not found' }));
	}
	console.log(`${req.method} ${req.statusCode} ${req.statusMessage}`);
});

// const res = Object.create(http.ServerResponse.prototype);

// console.log(res);
const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running on port ${PORT}`));
