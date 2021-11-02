/**
 * types and uninos
 */

//  type alliases: default basic types
type ID = string;
type PopularTag = string;
type MaybePopularTag = PopularTag | null;

interface UserInterface {
	ids: ID;
	name: string;
	surname: string;
}

let username: string = 'alex';

let pageNumber: string | number = '1';

let errorMessage: string | null = null;

// let user: UserInterface | null = null;

let someProp: string | number | null | undefined | string[] | object;

//  Unions + Type Alliases
const popularTags: PopularTag[] = ['dragon', 'coffe']; // arrary of strings

const dragonTag: MaybePopularTag = '';
