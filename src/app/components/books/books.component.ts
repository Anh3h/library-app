import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../../model/Book';
import { User } from '../../model/User';
import { Page } from '../../model/Page';
import { ApiService, TokenType } from '../../service/api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public isAuthenticated:Boolean = false;
  private url:String = "/books";
  public searchText:String;
  public books:Book[];
  public favoriteBookIds:String[] = [];
  private backup: Book[];
  public user = {} as User;
  public page = {} as Page;
  public pageParams = { size: 10, page: 1 }

  constructor( private apiService: ApiService, private router:Router ) { }

  ngOnInit() {
    let userId = localStorage.getItem('userId');
    if (userId) {
      this.isAuthenticated = true;
      this.getUser(userId);
    }
    this.getBooks();
  }

  private getUser(userId):void {
    this.apiService.get(`/users/${userId}`, TokenType.BEARER, (response) => {
      this.user = response;
      this.setFavoriteBookIds();
    }, (error) => {
      console.log(error);
    })
  }

  public onPrevious() {
    this.pageParams.page = (this.page.number - 1);
    this.getBooks();
  }

  public onNext() {
    this.pageParams.page = (this.page.number + 1);
    this.getBooks();
  }

  public goToPage(n: number) {
    this.pageParams.page = (n-1);
    this.getBooks();
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

  private getBooks():void {
    this.apiService.get(`${this.url}?size=${this.pageParams.size}&page=${this.pageParams.page}`, TokenType.BEARER, (data) => {
      this.page.first = data.first ;
      this.page.last = data.last;
      this.page.number = data.number;
      this.page.numberOfElements = data.numberOfElements;
      this.page.size = data.size;
      this.page.sort = data.sort;
      this.page.totalElements = data.totalElements;
      this.page.number = data.number;
      this.page.totalPages = data.totalPages;

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