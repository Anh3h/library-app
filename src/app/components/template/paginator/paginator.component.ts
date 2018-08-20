import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Page } from '../../../model/Page';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() public paginator = {} as Page;

  constructor() { }

  ngOnInit() { }

  @Output() goPrevious = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onPrevious(): void {
    this.goPrevious.emit(true);
  }

  onNext(next: boolean): void {
    this.goNext.emit(next);
  }

  totalPages(): number {
    return this.paginator.totalPages;
  }

  getPages(): number[] {
    const totalPages = this.paginator.totalPages;
    const pages: number[] = [];
    for (let i = 0; i < totalPages; i++){
      pages.push(i+1);
    }
    return pages;
  }

  isActive(pageNum) {
    return pageNum == (this.paginator.number + 1);
  }

}
