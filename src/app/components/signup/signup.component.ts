import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../model/User';
import { Error } from '../../model/Error';
import { SnackBar } from '../../model/SnackBar';
import { ApiService, TokenType } from '../../service/api.service'
import { SnackBarComponent } from '../template/snack-bar/snack-bar.component'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private url:String = "/users";
  public errorEmail:String = "";
  public user = {} as User;
  public error = {} as Error;
  public snackbar = {} as SnackBar;

  constructor( private apiService:ApiService, private router:Router ) {  }

  ngOnInit() {
  }

  public createUser():void {
    this.cleanObject();
    if (this.validateObject()) {
      this.error.status = false;
      this.user.username = `${this.user.firstName} ${this.user.lastName}`;
      this.user["roleId"] = "cb3e2b7d-34fa-4d47-b35e-d82d8689eddb";
      this.apiService.post(this.url, this.user, TokenType.BEARER, (response) => {
        this.snackbar.status = true;
        this.snackbar.message = "Successfully created user";
        setTimeout(() => {
          this.snackbar.status = false;
          this.snackbar.message = "";
        }, 3000);
        location.replace("/login");
      }, (error) => {
        this.error.status = true;
        this.error.message = error.message;
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
    return this.user.firstName.length > 0 && this.user.lastName.length > 0 && this.user.email.length > 0 &&
        this.validateEmail() && this.user.password.length > 0
  }

  private validateEmail():Boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.user.email).toLowerCase());
  }

  private cleanObject():void {
    this.user.firstName = this.user.firstName.trim();
    this.user.lastName = this.user.lastName.trim();
    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();
  }

}
