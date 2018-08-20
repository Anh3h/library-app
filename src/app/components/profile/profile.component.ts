import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../model/User';
import { Page } from '../../model/Page';
import { Transaction } from '../../model/Transaction';
import { TokenType, ApiService } from '../../service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private url:String = "/users/"
  public user = {} as User
  public transactions: Array<Transaction>;
  public page = {} as Page;
  public pageParams = { size: 5, page: 1 }

  constructor( private apiService:ApiService, private router:Router ) { }

  ngOnInit() {
    this.getUser(localStorage.getItem("userId"));
    this.getTransactions(localStorage.getItem("userId"));
  }

  private getUser(userId):void {
    this.apiService.get(`${this.url}${userId}`, TokenType.BEARER, (response) => {
      this.user = response;
    }, (error) => {
      console.log(error);
    })
  }

  public onPrevious() {
    this.pageParams.page = (this.page.number);
    this.getTransactions(localStorage.getItem("userId"));
  }

  public onNext() {
    this.pageParams.page = (this.page.number + 2);
    this.getTransactions(localStorage.getItem("userId"));
  }

  public goToPage(n: number) {
    this.pageParams.page = (n);
    this.getTransactions(localStorage.getItem("userId"));
  }

  private getTransactions(userId):void {
    let url = `/transactions?userId=${userId}&size=${this.pageParams.size}&page=${this.pageParams.page}`;
    this.apiService.get(url, TokenType.BEARER, (response) => {
      this.page.first = response.first ;
      this.page.last = response.last;
      this.page.number = response.number;
      this.page.numberOfElements = response.numberOfElements;
      this.page.size = response.size;
      this.page.sort = response.sort;
      this.page.totalElements = response.totalElements;
      this.page.number = response.number;
      this.page.totalPages = response.totalPages;

      this.transactions = response.content;
    }, (error) => {
      console.log(error);
    })
  }

  public redirect(bookId):void {
    this.router.navigate([`/books/${bookId}/view`]);
  }

}
