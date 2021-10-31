const fs = require('fs').promises;

const { generateId } = require('../utils/helper');

class FactoryHandler {
	/**
	 * GET ALL DOCUMENTS IN A COLLECTION
	 * @param {string} model  name of the folder that the document is stored
	 * (e.g) "books" or "users"
	 */
	async findAll(model) {
		try {
			const documents = [];

			const fileDir = `${__dirname}/../data/${model}`;

			const files = await fs.readdir(fileDir, { withFileTypes: true });

			for (let file of files) {
				const filePath = `${__dirname}/../data/${model}/${file.name}`;

				const data = await fs.readFile(filePath);

				documents.push(JSON.parse(data.toString()));
			}
			return documents;
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * FIND A DOCUMENT BY ID
	 * @param {string} model - name of the folder that the document is stored
	 * (e.g) "books" or "users"
	 * @param {string} id - name of the document to be read
	 */
	async findById(model, id, callback) {
		try {
			const filePath = `${__dirname}/../data/${model}/${id}.json`;
			const data = await fs.readFile(filePath);

			return callback(false, JSON.parse(data));
		} catch (error) {
			// callback(error.message);
			callback(BaseError('DATA ERROR: document does not exist', error.stack));
		}
	}

	/**
	 * CREATE DOCUMENT IN A COLLECTION
	 * @param {string} model - name of the folder that the document is to be stored
	 * (e.g) "books" or "users"
	 * @param {object} data - data to add to the file
	 */
	async create(model, data, callback) {
		try {
			const filename = generateId();

			const filePath = `${__dirname}/../data/${model}/${filename}.json`;

			const document = {
				_id: filename,
				...data,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			await fs.writeFile(filePath, JSON.stringify(document), { flag: 'w', encoding: 'utf-8' });

			callback(false, document);
		} catch (error) {
			callback(BaseError('DATA ERROR: collection does not exist', error.stack));
		}
	}

	/**
	 * UPDATE DOCUMENT IN A COLLECTION
	 * @param {string} model name of the folder that the document is stored
	 *  (e.g) "books" or "users"
	 * @param {string} id - name of the document to update
	 * @param {object} data - data to add to file
	 * @returns {object}
	 */
	async update(model, id, data, callback) {
		try {
			const filePath = `${__dirname}/../data/${model}/${id}.json`;

			const document = { _id: id, ...data, updatedAt: new Date().toISOString() };

			await fs.writeFile(filePath, JSON.stringify(document), { flag: 'r+', encoding: 'utf-8' });

			callback(false, document);
		} catch (error) {
			callback(BaseError('UPDATE ERROR: Failed to update document', error.stack));
		}
	}

	/**
	 * REMOVE A DOCUMENT FROM A COLLECTION
	 * @param {string} model - name of the the document folder
	 * @param {string} id - name of the document to delete
	 */
	async remove(model, id, callback) {
		try {
			const filePath = `${__dirname}/../data/${model}/${id}.json`;

			await fs.unlink(filePath);

			callback(false);
		} catch (error) {
			callback(BaseError('DELETE ERROR: Failed to delete document', error.stack));
		}
	}
}

// Custom Error message
function BaseError(message, stack) {
	return {
		message: message,
		stack: process.env.NODE_ENV === 'production' ? null : stack,
	};
}

module.exports = new FactoryHandler();
