import { Component, OnInit } from '@angular/core';

import { User } from '../../model/User';
import { Error } from '../../model/Error';
import { SnackBar } from '../../model/SnackBar';
import { TokenType, ApiService } from '../../service/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private url:String = "/users/";
  public user = {} as User;
  public error = {} as Error;
  public snackbar = {} as SnackBar;


  constructor( private apiService:ApiService ) { }

  ngOnInit() {
    this.getUser(localStorage.getItem('userId'));
  }

  private getUser(userId):void {
    this.apiService.get(`${this.url}${userId}`, TokenType.BEARER, (response) => {
      this.user = response;
    }, (error) => {
      console.log(error);
    })
  }

  public updateUser():void {
    this.cleanObject();
    if (this.validateObject()) {
      this.error.status = false;
      this.user.username = `${this.user.firstName} ${this.user.lastName}`;
      this.user["roleId"] = "cb3e2b7d-34fa-4d47-b35e-d82d8689eddb";
      this.apiService.put(`${this.url}${this.user.id}`, this.user, TokenType.BEARER, (response) => {
        this.snackbar.status = true;
        this.snackbar.message = "Successfully updated user";
        setTimeout(() => {
          this.snackbar.status = false;
          this.snackbar.message = "";
        }, 3000);
        location.replace("/profile");
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
    return this.user.firstName.length > 0 && this.user.lastName.length > 0
  }

  private cleanObject():void {
    this.user.firstName = this.user.firstName.trim();
    this.user.lastName = this.user.lastName.trim();
  }

}
