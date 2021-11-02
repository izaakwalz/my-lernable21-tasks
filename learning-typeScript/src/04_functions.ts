/**
 * @function functions in typeScript
 * */

// const getFulllName = (name: string, surname: string) => {
//   return name + ' ' + surname;
// };

//  it's safer to define everything explicitly
const getFulllName = (name: string, surname: string): string => {
	return name + ' ' + surname; // this verify the type of data to be returend
};

console.log(getFulllName('walz', 'dev'));
