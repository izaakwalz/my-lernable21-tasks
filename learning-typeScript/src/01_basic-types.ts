/**
 * Basic Types
 *
 * Variables and data types
 *
 * @type string
 * @type number
 * @type boolean
 * @description  I recommend to always specify types explicitly
 */

const dataTypes: string | number | boolean | any = null;

let id: number = 5;
const hello: string = 'world';
let world: string = 'world';
let isPublished: boolean = true;
let x: any = 'Hello'; // it could be any thing
let ids: number[] = [1, 3, 4, 5, 6, 7, 8]; // array of numbers
let arr: any[] = [1, true, 'hello']; // any allows you to add diffrent data types

/**
 *   data types
 * */
// .1 void type

const doSomething = (): void => {
	// void is set to undefined and null
	console.log('doSomething');
};

//  2. any type
let foo: any = 'foo'; // any type turns off typeScript checks

//  2. never
//  a function with never can't be executed to the end
const unDoSomething = (): never => {
	throw 'never';
};

// 4. unknown
let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
let s2: string = vUnknown as string; // as operator makes type assertion
let s3: string = '1';
let s4: number = s3 as unknown as number;
//  type  assertion
