import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoList, getTodos } from 'src/redux-state/todo-actions';

const Header = () => {
	const [title, setTitle] = useState('');
	const dispatch = useDispatch();

	const addTodo = useSelector((state: { addTodo: { loading: boolean; product: object } }) => state.addTodo);
	const { loading, product } = addTodo;

	useEffect(() => {
		dispatch(getTodos);
	}, [dispatch, product]);

	const handlesubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		dispatch(addTodoList({ id: uuid(), title: title }));
	};

	return (
		<div>
			<div className='mb-4'>
				<h1 className='text-gray-900 uppercase font-bold'>Todo List</h1>
				{loading && <h1>Loading</h1>}
				<form onSubmit={handlesubmit} autoComplete='off'>
					<div className='flex mt-4'>
						<input
							className='
									shadow
									appearance-none
									border
									rounded
									border-gray-900
									bg-gray-900
									w-full
									py-2
									px-3
									mr-4
									text-gray-200
								'
							type='text'
							id='title'
							name='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Add Todo'
						/>
						<button
							className='
									flex-no-shrink
									uppercase
									p-2
									border-2
									rounded
									text-gray-200
									bg-gray-900
									border-gray-900
									hover:text-white hover:bg-teal
								'
							id='add'
						>
							Add
						</button>
						<button
							className='
									flex-no-shrink
									uppercase
									p-2
									border-2
									rounded
									text-gray-200
									hidden
									bg-green-900
									border-green-900
									hover:text-white hover:bg-teal
								'
							id='update'
						>
							Save
						</button>
					</div>
					<small id='error' className='text-pink-300 hidden' style={{ transition: 'all ease-in-out 20ms' }}>
						!Warning: Please fill the field
					</small>
				</form>
			</div>
		</div>
	);
};

export default Header;
