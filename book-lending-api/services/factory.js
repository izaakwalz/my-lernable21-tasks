/**
 * FactoryHandler for handling CRUD operations
 */
class FactoryHandler {
	async findAll(model) {
		return Promise.resolve(model);
	}

	async findById(model, id) {
		const data = model.find((_data) => _data.id === id);

		return Promise.resolve(data);
	}

	async create(model, data) {
		const _data = { id: 1, ...data };
		model.push(_data);
		return Promise.resolve(_data);
	}

	async update(model, id, data) {
		const index = model.findIndex((_data) => _data.id === id);
		model[index] = { id, ...data };
		return Promise.resolve(model[index]);
	}

	async remove(model, id) {
		model = model.filter((_data) => _data.id !== id);
		writeDataToFile(`./data/${model}.json`, products);
		return Promise.resolve();
	}
}

module.exports = new FactoryHandler();
