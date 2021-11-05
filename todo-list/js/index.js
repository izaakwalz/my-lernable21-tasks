// Services used to perform CRUAD operations
const AppServices = new HelperFunctions();

// display all todos in localstorage
const showTodos = () => {
	const todos = AppServices.getTodos();

	todos.map((todo) => {
		todoList(todo);
	});
};

// add todo to div element
const todoList = (todo) => {
	const list = document.getElementById('todo');
	const div = document.createElement('div');

	div.innerHTML = `
     <div  class="flex mb-4 items-center transform transition-all duration-500">
     <p class="w-full text-gray-100">${todo.title}</p>
	 <p style="display: none;">${todo.id}</p>
     <p><a type="button" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-200 bg-green-900 border-green-900 hover:bg-green-900 cursor-pointer upd">EDIT</a></p>
     <p><a type="button" class="flex-no-shrink p-2 border-2 rounded hover:text-white text-red-200 bg-red-900 cursor-pointer border-red-900 hover:bg-red-800 del">X</a></p>
    </div>
    `;

	list.appendChild(div);
};

//  Create & Edit todo
const handleSubmit = async (e) => {
	const title = document.getElementById('title').value; // Get values from form
	// vlidate input field
	if (title === '') {
		e.preventDefault(); // Prevent default submit event

		document.getElementById('error').classList.remove('hidden');
	} else if (document.getElementById('add').classList.contains('hidden')) {
		const id = document.getElementById('update').classList[10];

		const data = { title };

		await AppServices.editTodo(id, data);
	} else {
		e.preventDefault(); // Prevent default submit event

		const id = Math.floor(Math.random() * 2000 + 1000); // generate id for todo

		const data = { id, title };

		await AppServices.addTodo(data);

		todoList(data);
	}
};

const deleteTodo = (event) => {
	if (event.classList.contains('del')) {
		event.parentElement.parentElement.remove();
	}
};
// Edit todo function
const editTodo = (event) => {
	if (event.classList.contains('upd')) {
		// get all todos
		const todos = AppServices.getTodos();
		// get the id of current todo
		const id = event.parentElement.previousElementSibling.textContent;

		todos.map((todo) => {
			if (todo.id == id) {
				let title = document.getElementById('title');
				title.value = todo.title;
				document.getElementById('update').classList.add(`${todo.id}`);
			}
			// remove hidden class from  update todo button
			document.getElementById('update').classList.remove('hidden');
			// add hidden class to create todo button
			document.getElementById('add').classList.add('hidden');
		});
	}
};

// Event: Display Todos
document.addEventListener('DOMContentLoaded', showTodos);

// Event: Add Todos
document.getElementById('add_todo').addEventListener('submit', handleSubmit);

// Event: delete todo form the list and also on local storage
document.getElementById('todo').addEventListener('click', async (e) => {
	deleteTodo(e.target);
	const id = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
	await AppServices.deleteTodo(id);
});

// Event Edit Todo
document.getElementById('todo').addEventListener('click', (e) => {
	editTodo(e.target);
});
