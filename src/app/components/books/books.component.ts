import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { ApiService, TokenType } from '../../service/api.service'
import { Book } from '../../model/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  private url:String = "/books";
  public searchText:String;
  public books:Book[];
  private backup: Book[];

  constructor( private apiService: ApiService, private router:Router ) { }

  ngOnInit() {
    this.getBooks();
  }

  private getBooks():void {
    this.apiService.get(this.url, TokenType.BEARER, (data) => {
      this.books = data.content;
      this.backup = data.content;
    }, (error) => {
      console.log(error);
    });
  }

  public applyFilter(filterValue: string):void {
    this.books = this.backup.filter((element, index, array) => {
      return element.title.includes(filterValue);
    });
  }

  public findBook(searchText):void {
    this.apiService.get(`${this.url}?title=${searchText}`, TokenType.BEARER, (data) => {
      if (data.totalPages > 0) {
        this.books = data.content;
      } else {
        // TODO print no found
        this.books = this.backup;
      }
    }, (error) => {
      console.log(error);
    });
  }

  public custom_router(book_id):void {
    this.router.navigate([`/books/${book_id}/view`])
  }

}
