import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService, TokenType } from '../../service/api.service'
import { Book } from '../../model/Book';

@Component({
  selector: 'app-home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.css']
})
export class HomeGridComponent implements OnInit {

  private url: String = "/books";
  public books:Book[];
  public popularBooks:Book[];

  constructor( private router: Router, private apiService: ApiService ) { }

  ngOnInit() {
    this.getBooks();
    this.getPopularBooks();
  }

  private getBooks():void {
    this.apiService.get(`${this.url}?page=1&size=4`, TokenType.BEARER, (data) => {
      this.books = data.content;
    }, (error) => {
      console.log(error);
    });
  }

  private getPopularBooks():void {
    this.apiService.get(`${this.url}?page=1&size=4&sort=true`, TokenType.BEARER, (data) => {
      this.popularBooks = data.content;
    }, (error) => {
      console.log(error);
    });
  }

  public custom_router(book_id):void {
    this.router.navigate([`/books/${book_id}/view`])
  }

}
