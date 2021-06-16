import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Stream} from '../../../../features/stream/models/stream.model';
import {StreamService} from '../../../../features/stream/services/stream.service';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';

import {User} from '../../../../features/user/models/user.model';
import {Category} from '../../../../features/stream/models/category.model';
import {CategoryService} from '../../../../features/stream/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  streams$: Observable<Stream[]>;
  categories$: Observable<Category[]>;
  user$: BehaviorSubject<User | undefined>;

  constructor(
    private readonly streamService: StreamService,
    private readonly categoryService: CategoryService,
    private readonly currentUserService: CurrentUserService,
  ) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.streams$ = this.streamService.getAllUsers();
    this.user$ = this.currentUserService.user$;
  }

}

