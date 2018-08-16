import { Component, OnInit, Input } from '@angular/core';

import { SnackBar } from '../../../model/SnackBar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  @Input() snackbar = {} as SnackBar;

  constructor() { }

  ngOnInit() {
  }

}
