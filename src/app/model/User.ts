import { Book } from './Book'
import { Role } from './Role'
import { Transaction } from './Transaction'

export interface User {
    id: String;
	firstName: String;
	lastName: String;
	username: String;
	email: String;
	password: String;
	dob: Date;
	telephone: String;
	role: Role;
	favoriteBooks: Array<Book>;
    notifications: Array<Notification>;
    transactions: Array<Transaction>;
}