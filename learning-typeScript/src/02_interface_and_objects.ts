/**
 * interfaces
 * @interface
 * it helps to describe entities. -
 * Interface is an important entity inside typeScript
 * which allows us to create objects with some properties,
 * it is also a reserved word in typeScript
 * interface can also have an optional property and also a readonly
 * by default all properties inside interface are mandatory
 */

// postfix for all my interface
interface UserInterface {
	readonly id: number; // readonly
	name: string;
	age?: number;
	getMessage(): string;
}

/**
 * Objects in typeScripts
 * @Objects
 */

// example 1
// const user1: UserInterface = {
// 	id: 1,
// 	name: "jhon",
// }

const user2: UserInterface = {
	id: 1,
	name: 'Jack',
	getMessage() {
		return 'Hello';
	},
};
// console.log(user2.getMessage());

/*  it helps to describe entities 
Interface is an important entity inside typeScript 
which allows us to create objects with some properties */
