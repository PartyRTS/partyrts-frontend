import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StreamCategoryService {

  constructor(private readonly http: HttpClient) {
  }

  getAllCategories(streamId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/v1/streams/${streamId}/categories`);
  }

  addCategories(streamId: number, categoriesIds: number[]): Observable<null> {
    return this.http.post<null>(`${environment.apiUrl}/api/v1/streams/${streamId}/addCategories`, categoriesIds);
  }
}
