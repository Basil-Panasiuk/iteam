import { Component } from '@angular/core';
import { ICat } from './models/cats';
import { CatsService } from './services/cats.service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedCategory = new FormControl(0);
  limit = 10;
  counts = [2, 4, 6, 8, 10];
  pageEvent: PageEvent;
  page = 1;
  paginationCount = 10;
  loading = false;

  constructor(
    public catsService: CatsService,
    public errorService: ErrorService
  ) {
    this.selectedCategory.valueChanges.subscribe((newVal) => {
      this.loading = true;
      this.page = 1;
      this.catsService
        .getCats(this.limit, this.page, newVal as number)
        .subscribe(this.handleCatsResponse.bind(this));
    });
  }

  handlePagination(e: PageEvent) {
    this.loading = true;
    if (this.limit !== e.pageSize) {
      this.page = 1;
    } else {
      this.page = e.pageIndex + 1;
    }
    this.limit = e.pageSize;
    this.catsService
      .getCats(e.pageSize, this.page, this.selectedCategory.value as number)
      .subscribe(this.handleCatsResponse.bind(this));
    return e;
  }

  ngOnInit(): void {
    this.catsService.getCategories().subscribe((res) => {
      console.log(res);
    });

    this.loading = true;

    this.catsService
      .getCats(this.limit, this.page, this.selectedCategory.value as number)
      .subscribe(this.handleCatsResponse.bind(this));
  }

  handleCatsResponse(res: HttpResponse<ICat[]>) {
    this.paginationCount = +(res.headers.get('pagination-count') as string);
    this.loading = false;
  }
}
