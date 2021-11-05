/**
 * @function  HelperFunctions - Services used to perform CRUAD operations
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class HelperFunctions {
    /**
     * Get all Todo
     * @returns todos
     */
    getTodos() {
        let todos;
        if (!localStorage.getItem('todos'))
            todos = [];
        else
            todos = JSON.parse(localStorage.getItem('todos'));
        return todos;
    }
    /**
     * Add Todo
     * @param {object} data data containing todo object e.g - {id, title}
     */
    addTodo(data) {
        const todos = this.getTodos();
        todos.push(data);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    /**
     * Edit Todo
     * @param {*} id id of todo to update
     * @param {object} data - todo title object
     */
    editTodo(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = this.getTodos();
            const index = todos.findIndex((todo) => todo.id == id);
            // const index = todos.indexOf(id);
            todos[index] = Object.assign({}, todos[index], data);
            localStorage.setItem('todos', JSON.stringify(todos));
        });
    }
    /**
     *
     * @param {*} id - id of todo to update
     */
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = this.getTodos();
            todos.map((todo, index) => {
                if (todo.id == id)
                    todos.splice(index, 1);
            });
            localStorage.setItem('todos', JSON.stringify(todos));
        });
    }
}
