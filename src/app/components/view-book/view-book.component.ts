import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../model/Book';
import { Comment } from '../../model/Comment';
import { Transaction } from '../../model/Transaction';
import { Error } from '../../model/Error';
import { ApiService, TokenType } from '../../service/api.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  public isAuthenticated:Boolean = false;
  private url:String = "/books";
  private bookId:String;
  public book = {} as Book;
  public comment = {} as Comment;
  public comments: Comment[];
  public popularBooks:Book[];
  public transaction = {} as Transaction;
  public now = new Date();
  public error = {} as Error;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private router:Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isAuthenticated = true;
    }
    this.bookId = this.activeRoute.snapshot.paramMap.get('book_id');
    this.url = `${this.url}/${this.bookId}`;
    this.getBook();
    this.getComments();
    this.getPopularBooks();
  }

  private getBook() {
    this.apiService.get(this.url, TokenType.BEARER, (data) => {
      this.book = data;
    }, (error) => {
      console.log(error);
    })
  }

  private getPopularBooks():void {
    let url = `/books`;
    this.apiService.get(`${url}?page=1&size=3&sort=true`, TokenType.BEARER, (data) => {
      this.popularBooks = data.content;
    }, (error) => {
      console.log(error);
    });
  }

  public upvoteBook():void {
    this.book.upVotes = this.book.upVotes + 1;
    this.updateBook();
  }

  public downVoteBook():void {
    this.book.downVotes = this.book.downVotes - 1;
    this.updateBook();
  }

  private updateBook() {
    this.apiService.put(this.url, this.book, TokenType.BEARER, (response) => {}, (error) => {
      console.log(error)
    })
  }

  public verifyAuthenticity():void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(["/login"]);
    }
  }

  public addComment():void {
    let url = `/comments`;
    this.comment['bookId'] = this.book.id;
    this.comment['userId'] = localStorage.getItem('userId');
    this.apiService.post(url, this.comment, TokenType.BEARER, (response) => {
      this.comments.push(response);
      this.comment = {} as Comment;
    }, (error) => {
      console.log(error);
    })
  }

  public reserveBook():void {
    this.transaction.checkInStatus = "PENDING";
    this.transaction.checkOutStatus = "PENDING";
    this.transaction["bookId"] = this.book.id;
    this.transaction["userId"] = localStorage.getItem("userId");
    this.transaction.id = "";
    if (this.verifyDates()) {
      this.apiService.post('/transactions', this.transaction, TokenType.BEARER, (response) => {
        this.router.navigate(["/profile"]);
      }, (error) => {
        this.error.message = error.message;
        this.error.status = true;
        console.log(error);
      })
    }
  }

  private verifyDates():Boolean {
    if (new Date(this.transaction.checkOut) < this.now) {
      this.error.message = "Check-out date must be greater than today's date";
      this.error.status = true;
      return false;
    }
    if (this.transaction.checkOut > this.transaction.checkIn) {
      this.error.message = "Check-out date must be less than or equal to check-in";
      this.error.status = true;
      return false;
    }
    this.error.message = "";
    this.error.status = false;
    return true;
  }

  private getComments() {
    let url = `/comments?book=${this.bookId}`;
    this.apiService.get(url, TokenType.BEARER, (data) => {
      this.comments = data.content;
    }, (error) => {
      console.log(error);
    })
  }

}
