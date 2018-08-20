import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService, TokenType } from '../../service/api.service'
import { Book } from '../../model/Book';
import { User } from '../../model/User';

@Component({
  selector: 'app-home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.css']
})
export class HomeGridComponent implements OnInit {

  private url: String = "/books";
  public books:Book[];
  public popularBooks:Book[];
  public favoriteBookIds:String[] = [];
  public user = {} as User;
  public isAuthenticated:Boolean = false;

  constructor( private router: Router, private apiService: ApiService ) { }

  ngOnInit() {
    let userId = localStorage.getItem('userId');
    if (userId) {
      this.isAuthenticated = true;
      this.getUser(userId);
    }
    this.getBooks();
    this.getPopularBooks();
  }

  private getUser(userId):void {
    this.apiService.get(`/users/${userId}`, TokenType.BEARER, (response) => {
      this.user = response;
      this.setFavoriteBookIds();
    }, (error) => {
      console.log(error);
    })
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

  private setFavoriteBookIds() {
    this.user['favoriteBookIds'] = [];
    if (this.user.favoriteBooks && this.user.favoriteBooks.length > 0) {
      this.user.favoriteBooks.forEach( (book) => {
        this.user['favoriteBookIds'].push(book.id);
      })
    }
    this.favoriteBookIds = this.user['favoriteBookIds'];
  }

  public addFavorite(bookId):void {
    this.user['favoriteBookIds'].push(bookId);
    this.user['roleId'] = this.user.role.id;
    this.apiService.put(`/users/${this.user.id}`, this.user, TokenType.BEARER, (response) => {
      this.user['favoriteBookIds'].push(bookId);
      this.favoriteBookIds = this.user['favoriteBookIds'];
    }, (error) => {
      console.log(error)
    })
  }

}
