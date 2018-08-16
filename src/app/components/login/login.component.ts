import { Component, OnInit } from '@angular/core';

import { Error } from '../../model/Error';
import { Token } from '../../model/Token';
import { TokenType, ApiService } from '../../service/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credential = {} as Credentials;
  public error = {} as Error;
  public errorEmail:String = "";

  constructor( private apiService:ApiService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      location.replace("");
    }
  }

  public authenticate():void {
    this.cleanObject();
    if (this.validateObject()) {
      this.error.status = false;
      let url = `/oauth/token?grant_type=password&username=${this.credential.email}&password=${this.credential.password}`;
      this.apiService.post(url, {}, TokenType.BASIC, (response) => {
        this.updateStorage(response);
      },  (error) => {
        this.error.message = error.message;
        this.error.status = true
      })
      return;
    }
    this.error.message = "Fill all input fields correctly.";
    this.error.status = true;
  }

  private validateObject():Boolean {
    if (!this.validateEmail()){
      this.errorEmail = "errorEmail";
    } else {
      this.errorEmail = "";
    }
    return this.credential.email.length > 0 && this.validateEmail() && this.credential.password.length > 0
  }

  private validateEmail():Boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.credential.email).toLowerCase());
  }

  private cleanObject():void {
    this.credential.email = this.credential.email.trim();
    this.credential.password = this.credential.password.trim();
  }

  private updateStorage(response):void  {
    localStorage.removeItem('token');
    let token = Token.createInstance(response.access_token, response.refresh_token, <number> (new Date().getTime() / 1000));
    localStorage.setItem('token', JSON.stringify(token));
    this.setUser();
  }

  private setUser():void {
    let url = `/users/email/${this.credential.email}`;
    this.apiService.get(url, TokenType.BEARER, (response) => {
      console.log(response);
      this.setNotification(response.id);
      localStorage.setItem('userId', response.id);
    }, (error) => {
      console.log(error);
    })
  }

  private setNotification(userId):void {
    let url = `/users/${userId}/notifications`;
    this.apiService.get(url, TokenType.BEARER, (response) => {
      localStorage.setItem('notifications', response.totalElements);
      location.replace("");
    }, (error) => {
      console.log(error);
    })
  }

}

interface Credentials {
  email:String;
  password:String;
}