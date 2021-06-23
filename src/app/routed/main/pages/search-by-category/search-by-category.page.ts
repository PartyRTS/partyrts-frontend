import {Component, OnInit} from '@angular/core';
import {Stream} from '../../../../features/stream/models/stream.model';
import {StreamService} from '../../../../features/stream/services/stream.service';
import {CategoryService} from '../../../../features/stream/services/category.service';
import {UserFriendService} from '../../../../features/user/services/user-friend.service';
import {AuthService} from '../../../../features/core/services/auth.service';
import {UserService} from '../../../../features/user/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {StreamCategoryService} from '../../../../features/stream/services/stream-category.service';

@Component({
  selector: 'app-search-by-category',
  templateUrl: './search-by-category.page.html',
  styleUrls: ['./search-by-category.page.scss']
})
export class SearchByCategoryPage implements OnInit {

  streams: Stream[];

  currentUserId: number;

  constructor(
    private readonly streamService: StreamService,
    private readonly streamCategoryService: StreamCategoryService,
    private readonly categoryService: CategoryService,
    private readonly userFriendService: UserFriendService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
  ) {
  }

  async ngOnInit(): Promise<void> {
    const categoryId = Number(this.route.snapshot.queryParams.categoryId);
    const streams = await this.streamService.getAllStreams().toPromise();
    console.log(categoryId);
    const selectedStreams: Stream[] = [];

    for (const stream of streams) {
      const categories = await this.streamCategoryService.getAllCategories(stream.idStream).toPromise();
      console.log(categories);
      if (categories.some(value => value.idCategory === categoryId)) {
        selectedStreams.push(stream);
      }
    }

    this.streams = selectedStreams.filter(value => value.activeStream);
  }
}
