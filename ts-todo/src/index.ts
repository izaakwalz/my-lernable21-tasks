// Services used to perform CRUAD operations
const AppServices = new HelperFunctions();

// display all todos in localstorage
const showTodos = () => {
	const todos = AppServices.getTodos();

	todos.map((todo: { title: string; id: string }) => {
		todoList(todo);
	});
};

// add todo to div element
const todoList = (todo: { title: string; id: string }) => {
	const list = document.getElementById('todo');
	const div = document.createElement('div');

	div.innerHTML = `
     <div  class="flex mb-4 items-center" style="transition: opacity 2000ms ease-in;">
     <p class="w-full text-grey-200">${todo.title}</p>
	 <p style="display: none;">${todo.id}</p>
     <p><a type="button" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey-200 bg-green-900 border-green-900 hover:bg-green-800 upd">EDIT</a></p>
     <p><a type="button" class="flex-no-shrink p-2 border-2 rounded hover:text-white text-red-200 bg-red-900 border-red-900 hover:bg-red-800 del">X</a></p>
    </div>
    `;

	list.appendChild(div);
};

//  Create & Edit todo
const handleSubmit = (e: { preventDefault: () => void }) => {
	const titleValue = document.getElementById('title') as HTMLInputElement; // Get values from form
	const title = titleValue.value;
	// vlidate input field
	if (title === '') {
		e.preventDefault(); // Prevent default submit event

		document.getElementById('error').classList.remove('hidden');
	} else if (document.getElementById('add').classList.contains('hidden')) {
		const id = document.getElementById('update').classList[10];

		const data: { title: string } = { title };

		AppServices.editTodo(id, data);
	} else {
		e.preventDefault(); // Prevent default submit event

		const id = Math.floor(Math.random() * 2000 + 1000).toString(); // generate id for todo

		const data: { id: string; title: string } = { id, title };

		AppServices.addTodo(data);

		todoList(data);
	}
};

const deleteTodo = (event: HTMLBodyElement) => {
	if (event.classList.contains('del')) {
		event.parentElement.parentElement.remove();
	}
};

// Event: Display Todos
document.addEventListener('DOMContentLoaded', showTodos);

// Event: Add Todos
document.getElementById('add_todo').addEventListener('submit', handleSubmit);

// Event: delete todo form the list and also on local storage
document.getElementById('todo').addEventListener('click', (e) => {
	const target = e.target as HTMLBodyElement;

	deleteTodo(target);
	const id = target.parentElement.previousElementSibling.previousElementSibling.textContent;
	AppServices.deleteTodo(id);
});
