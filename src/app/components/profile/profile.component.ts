import { Component, OnInit } from '@angular/core';

import { User } from '../../model/User';
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

  constructor( private apiService:ApiService ) { }

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

  private getTransactions(userId):void {
    let url = `/transactions?userId=${userId}`;
    this.apiService.get(url, TokenType.BEARER, (response) => {
      this.transactions = response.content;
    }, (error) => {
      console.log(error);
    })
  }

}
