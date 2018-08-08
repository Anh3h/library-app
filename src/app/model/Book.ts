import { Topic } from './Topic'
export interface Book {
    id: String;
	title: String;
	isbn: String;
	author: String;
	edition: String;
	publisher: String;
	publicationDate: Date;
	topic: Topic;
	shelf: String;
	totalQty: Number;
	availableQty: Number;
	upVotes: Number;
	downVotes: Number;
	numOfBorrows: Number;
	coverImage: String;
    comments: Array<Comment>;
}