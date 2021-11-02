// const someElement = document.querySelector('.foo') as HTMLInputElement;
const someElement = document.querySelector('.foo');
// ? Element is the highest class in hierarhy
// console.log('someElement',( someElement as any).value);  // wrong
// console.log('someElement', someElement);  // correct
someElement.addEventListener('blur', (event) => {
	// ? event is also a highest class in hierarhy
	const target = event.target as HTMLInputElement;
	console.log('event', target.value);
});
