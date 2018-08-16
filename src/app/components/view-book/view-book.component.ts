import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService, TokenType } from '../../service/api.service'
import { Book } from '../../model/Book';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  private url:String = "/books"
  private bookId:String;
  public book:Book;
  public comments: Comment[];
  public popularBooks:Book[];

  constructor( private activeRoute: ActivatedRoute, private apiService: ApiService ) { }

  ngOnInit() {
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
      console.log(this.popularBooks)
    }, (error) => {
      console.log(error);
    });
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
