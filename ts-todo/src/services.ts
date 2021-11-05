/**
 * @function  HelperFunctions - Services used to perform CRUAD operations
 */

class HelperFunctions {
	/**
	 * Get all Todo
	 * @returns todos
	 */
	getTodos() {
		let todos: any;

		if (!localStorage.getItem('todos')) todos = [];
		else todos = JSON.parse(localStorage.getItem('todos'));

		return todos;
	}

	/**
	 * Add Todo
	 * @param {object} data data containing todo object e.g - {id, title}
	 */
	addTodo(data: object) {
		const todos = this.getTodos();

		todos.push(data);

		localStorage.setItem('todos', JSON.stringify(todos));
	}

	/**
	 * Edit Todo
	 * @param {*} id id of todo to update
	 * @param {object} data - todo title object
	 */
	async editTodo(id: string, data: object) {
		const todos = this.getTodos();

		const index = todos.findIndex((todo: { id: string }) => todo.id == id);
		// const index = todos.indexOf(id);
		todos[index] = Object.assign({}, todos[index], data);

		localStorage.setItem('todos', JSON.stringify(todos));
	}
	/**
	 *
	 * @param {*} id - id of todo to update
	 */
	async deleteTodo(id: string) {
		const todos = this.getTodos();

		todos.map((todo: { id: string }, index: number) => {
			if (todo.id == id) todos.splice(index, 1);
		});

		localStorage.setItem('todos', JSON.stringify(todos));
	}
}
