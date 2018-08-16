import { Component, OnInit } from '@angular/core';

import { Error } from '../../model/Error';
import { SnackBar } from '../../model/SnackBar';
import { TokenType, ApiService } from '../../service/api.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  private url:String = "/reset-password"
  public credential = {} as Credential;
  public error = {} as Error;
  public snackbar = {} as SnackBar;
  public prevPassword:String = "";
  public password1:String = "";

  constructor( private apiService:ApiService ) { }

  ngOnInit() {
  }

  public updatePassword():void {
    this.cleanObject();
    if (this.validateObject()) {
      this.error.status = false;

      let userId = localStorage.getItem('userId');
      this.apiService.get(`/users/${userId}`, TokenType.BEARER, (response) => {
        this.credential.email = response.email;
        this.apiService.put(this.url, this.credential, TokenType.BEARER, (response) => {
          this.snackbar.status = true;
          this.snackbar.message = "Successfully updated password";
          setTimeout(() => {
            this.snackbar.status = false;
            this.snackbar.message = "";
          }, 3000);
          this.logout();
        }, (error) => {
          this.error.status = true;
          this.error.message = error.message;
        })
      }, (error) => {
        console.log(error);
      })

      return;
    }
  }

  private validateObject():Boolean {
    if (this.credential.password.length > 0 && this.prevPassword.length > 0 && this.password1.length > 0) {
      if (this.password1 == this.credential.password){
        return true
      }
      this.error.message = "New password mismatch";
      this.error.status = true;
      return false
    }
    this.error.message = "Fill all fields correctly";
    this.error.status = true;
    return false
  }

  private cleanObject():void {
    this.credential.password = this.credential.password.trim();
    this.prevPassword = this.prevPassword.trim();
    this.password1 = this.password1.trim();
  }

  private logout():void {
    localStorage.removeItem("token");
    localStorage.removeItem("notifications");
    localStorage.removeItem("user");
    location.replace("");
  }

}
interface Credential {
  email: String;
  password: String;
}
