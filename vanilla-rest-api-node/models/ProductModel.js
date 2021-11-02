let products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next).catch(next));

// function findAll() {
// 	return new Promise((resolve, reject) => {
// 		resolve(products);
// 	});
// }

function findAll() {
	return Promise.resolve(products);
}

function findById(id) {
	return new Promise((resolve, reject) => {
		const product = products.find((product) => product.id === id);
		resolve(product);
	});
}

async function create(product) {
	return new Promise((resolve, reject) => {
		const newProduct = { id: uuidv4(), ...product };
		products.push(newProduct);
		writeDataToFile('./data/products.json', products);
		resolve(newProduct);
	});
}

async function update(id, product) {
	return new Promise((resolve, reject) => {
		// const updatePRoduct = { id: uuidv4(), ...product };
		const index = products.findIndex((p) => p.id === id);
		products[index] = { id, ...product };
		// products.push(updatePRoduct);
		writeDataToFile('./data/products.json', products);
		resolve(products[index]);
	});
}

async function remove(id) {
	return new Promise((resolve, reject) => {
		products = products.filter((p) => p.id !== id);
		writeDataToFile('./data/products.json', products);
		resolve();
	});
}

module.exports = { findAll, findById, create, update, remove };
