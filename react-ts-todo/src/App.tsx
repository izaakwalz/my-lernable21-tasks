import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';

function App() {
	return (
		<div className='h-screen bg-gray-900 overflow-hidden flex items-center justify-center'>
			<div className='h-100 w-full flex items-center justify-center bg-teal-lightest font-sans'>
				<div className='bg-yellow-700 rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>
					<Header />
					<TodoList />
				</div>
			</div>
		</div>
	);
}

export default App;
