import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public isAuthenticated:Boolean = false;
  public notifications: String;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isAuthenticated = true;
      this.intializeNotifications();
    }
  }

  private intializeNotifications():void {
    if (parseInt(localStorage.getItem('notifications')) > 0) {
      this.notifications = localStorage.getItem('notifications');
    }
  }

  public logout():void {
    localStorage.removeItem("token");
    localStorage.removeItem("notifications");
    localStorage.removeItem("user");
    location.replace("");
  }

}
