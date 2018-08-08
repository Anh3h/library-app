import { User } from './User'
import { Book } from './Book'

export interface Notification {
    id: String;
	action: String;
	content: String;
	createdAt: Date;
	done: Boolean;
	user: User;
	book: Book;
}