import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class BrowseService {
  constructor(private httpClient: HttpClient) {}

  public getAll(value: string, type: string = '', page: number): any {
    return this.httpClient
      .get(
        `${environment.apiUrl}?apiKey=${
          environment.apiKey
        }&s=${encodeURIComponent(value)}&type=${type}&page=${page}`
      )
      .pipe(map((response) => response));
  }

  public getById(id: string) {
    return this.httpClient.get(
      `${environment.apiUrl}?apiKey=${environment.apiKey}&i=${id}`
    );
  }
}
