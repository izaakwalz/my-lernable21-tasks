import { ADD_TODO_SUCCESS, GET_TODO_SUCCESS } from './todo-constant';

export const getTodoReducer = (state: object = { todos: [] }, action: any) => {
	switch (action.type) {
		case GET_TODO_SUCCESS:
			return { loading: false, todos: action.payload };
		default:
			return state;
	}
};

export const addTodoReducer = (state: object = { todo: {} }, action: any) => {
	switch (action.type) {
		case ADD_TODO_SUCCESS:
			return { loading: false, payload: action.payload };
		default:
			return state;
	}
};
