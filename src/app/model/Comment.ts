import { Book } from './Book'
import { User } from './User'

export interface Comment {
    id: String;
	user: User;
	book: Book;
	text: String;
}