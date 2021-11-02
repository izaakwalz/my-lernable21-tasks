//  implemintin itnteface

interface UserInterFace {
	getFullNamw(): string;
}

class User {
	private firstname: string;
	private lastName: string;
	readonly unchangableName: string;
	static readonly maxAge = 50;

	constructor(firstName: string, lastName: string) {
		this.firstname = firstName;
		this.lastName = lastName;
		this.unchangableName = firstName;
	}

	changeUnchangableName(): void {
		// this.unchangableName = "foo"
	}

	getFullname(): string {
		return this, this.firstname + ' ' + this.lastName;
	}
} // everything is public by default , protected: thid can be alloewd in class and children

const user = new User('Walz', 'Dev');

console.log(user.getFullname);
