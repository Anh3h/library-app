import { User } from './User'
import { Book } from './Book'
export interface Transaction {
    id: String;
	user: User;
	book: Book;
	checkOut: Date;
	checkIn: Date;
	checkOutStatus: String;
	checkInStatus: String;
}