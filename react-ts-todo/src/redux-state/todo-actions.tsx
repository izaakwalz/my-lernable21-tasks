// import { v4 as uuid } from 'uuid';
import { ADD_TODO_SUCCESS, DELETE_TODO_SUCCESS, GET_TODO_SUCCESS } from './todo-constant';

// const data: object[] = [
// 	{ id: uuid(), title: 'Make a Todo component' },
// 	{ id: uuid(), title: 'Make a Todos component' },
// 	{ id: uuid(), title: 'Make a Todo component' },
// 	{ id: uuid(), title: 'Make a Todo component' },
// ];

export const getTodos = async (dispatch: (arg0: { type: string; payload: object }) => void) => {
	let todos: any = localStorage.getItem('todos');

	if (!todos) todos = [];
	else todos = await JSON.parse(todos);

	return dispatch({ type: GET_TODO_SUCCESS, payload: todos });
};

export const addTodoList = (data: object) => async (dispatch: (arg0: { type: string; payload: object }) => void) => {
	let todos: any = localStorage.getItem('todos');

	if (!todos) todos = [];
	else todos = await JSON.parse(todos);

	await todos.push(data);

	dispatch({ type: ADD_TODO_SUCCESS, payload: todos });

	localStorage.setItem('todos', JSON.stringify(todos));
};

export const deleteTodo = (id: string) => async (dispatch: (arg0: { type: string }) => void) => {
	let todos: any = localStorage.getItem('todos');

	if (!todos) todos = [];
	else todos = await JSON.parse(todos);

	await todos.map((todo: { id: string }, index: number) => todo.id === id && todos.splice(index, 1));

	dispatch({ type: DELETE_TODO_SUCCESS });

	localStorage.setItem('todos', JSON.stringify(todos));
};
