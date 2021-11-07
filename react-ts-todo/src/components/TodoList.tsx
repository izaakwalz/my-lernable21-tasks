import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from 'src/redux-state/todo-actions';

const TodoList = () => {
	const dispatch = useDispatch();

	const todoList = useSelector((state: { todoList: { loading: boolean; todos: object[] } }) => state.todoList);
	const { loading, todos } = todoList;

	useEffect(() => {
		dispatch(getTodos);
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<h1>Loading</h1>
			) : (
				<div>
					{todos.map(({ id, title }: any) => (
						<div
							key={id}
							className='flex mb-4 items-center'
							style={{ transition: 'opacity 2000ms ease-in' }}
						>
							<p className='w-full text-grey-200'>{title}</p>

							<button
								type='button'
								className='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey-200 bg-green-900 border-green-900 hover:bg-green-800'
							>
								✏️
							</button>

							<button
								type='button'
								className='flex-no-shrink p-2 border-2 rounded hover:text-white text-red-200 bg-red-900 border-red-900 hover:bg-red-800'
							>
								✖️
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TodoList;
