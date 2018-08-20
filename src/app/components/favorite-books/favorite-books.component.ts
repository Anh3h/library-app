import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { ApiService, TokenType } from '../../service/api.service'
import { Book } from '../../model/Book';

@Component({
  selector: 'app-favorite-books',
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.css']
})
export class FavoriteBooksComponent implements OnInit {

  private url:String = "/users/";
  public books:Book[];

  constructor( private apiService: ApiService, private router:Router ) { }
  ngOnInit() {
    this.getBooks();
  }

  private getBooks():void {
    let userId = localStorage.getItem('userId');
    this.apiService.get(`${this.url}${userId}`, TokenType.BEARER, (data) => {
      this.books = data.favoriteBooks;
    }, (error) => {
      console.log(error);
    });
  }

}
