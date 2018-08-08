import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-grid',
  templateUrl: './home-grid.component.html',
  styleUrls: ['./home-grid.component.css']
})
export class HomeGridComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  public custom_router(book_id) {
    book_id=1
    this.router.navigate([`/books/${book_id}/view`])
  }

}
