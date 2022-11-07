import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { ICat, ICategory } from '../models/cats';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}
  cats: ICat[] = [];
  categories: ICategory[] = [];

  private API_KEY =
    'live_ggzqgK5G4tpsSELeEV0YBa7jAvfqK6EMnobKx9qNbnIqFJrNimMiBRAMPTigUCQp';
  private baseUrl = 'https://api.thecatapi.com/v1/';
  private header = new HttpHeaders({
    'x-api-key': this.API_KEY,
  });

  getCategories(): Observable<ICategory[]> {
    const httpOptions = {
      headers: this.header,
    };

    return this.http
      .get<ICategory[]>(`${this.baseUrl}categories/`, httpOptions)
      .pipe(
        tap((data) => {
          this.categories = data;
        })
      );
  }

  getCats(limit = 10, page = 1, id = 0): Observable<HttpResponse<ICat[]>> {
    let params = new HttpParams({
      fromObject: {
        limit,
        page,
      },
    });

    if (+id) {
      params = params.append('category_ids', id);
    }

    const httpOptions = {
      observe: 'response' as const,
      headers: this.header,
      params,
    };

    return this.http
      .get<ICat[]>(`${this.baseUrl}images/search`, httpOptions)
      .pipe(
        tap((res) => {
          if (res.body) {
            this.cats = res.body;
          }
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
