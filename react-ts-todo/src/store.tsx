import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { getTodoReducer, addTodoReducer, removeTodo } from './redux-state/todo-reducer';

const reducer = combineReducers({
	todoList: getTodoReducer,
	addTodo: addTodoReducer,
	removeTodo: removeTodo,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
