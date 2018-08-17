import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Notification } from '../../model/Notification';
import { TokenType, ApiService } from '../../service/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  private url:String = "/users/"
  public notifications: Array<Notification>;

  constructor( private apiService:ApiService, private router:Router ) { }

  ngOnInit() {
    this.getNotifications(localStorage.getItem('userId'))
  }

  private getNotifications(userId):void {
    let url = `${userId}/notifications?done=false`;
    this.apiService.get(`${this.url}${url}`, TokenType.BEARER, (response) => {
      this.notifications = response.content;
      this.notifications.forEach( (notification) => {
        notification.done = true;
        this.apiService.put(`/notifications/${notification.id}`, notification, TokenType.BEARER, (response) => {}, (error) => {
          console.log(error);
        })
      })
    }, (error) => {
      console.log(error);
    })
  }

  public redirect(bookId):void {
    this.router.navigate([`/books/${bookId}/view`]);
  }

}
