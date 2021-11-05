/**
 * @function  HelperFunctions - Services used to perform CRUAD operations
 */
class HelperFunctions {
	/**
	 * Get all Todo
	 * @returns todos
	 */
	getTodos() {
		let todos;

		if (localStorage.getItem('todos') === null) {
			todos = [];
		} else {
			todos = JSON.parse(localStorage.getItem('todos'));
		}

		return todos;
	}
	/**
	 * Add Todo
	 * @param {object} data data containing todo object e.g - {id, title}
	 */
	async addTodo(data) {
		const todos = await this.getTodos();

		todos.push(data);

		localStorage.setItem('todos', JSON.stringify(todos));
	}
	/**
	 * Edit Todo
	 * @param {*} id id of todo to update
	 * @param {object} data - todo title object
	 */
	async editTodo(id, data) {
		const todos = this.getTodos();

		const index = todos.findIndex((todo) => todo.id == id);
		// const index = todos.indexOf(id);
		todos[index] = Object.assign({}, todos[index], data);

		localStorage.setItem('todos', JSON.stringify(todos));
	}
	/**
	 *
	 * @param {*} id - id of todo to update
	 */
	async deleteTodo(id) {
		const todos = this.getTodos();

		todos.map((todo, index) => {
			if (todo.id == id) todos.splice(index, 1);
		});

		localStorage.setItem('todos', JSON.stringify(todos));
	}
}