import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search$ = new ReplaySubject<string>(3);

  constructor() {
    this.search$.next('');
  }

  search(name: string): void {
    this.search$.next(name);
  }
}
