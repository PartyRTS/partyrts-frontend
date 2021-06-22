import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../../user/models/user.model';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {UserService} from '../../../user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;

  private currentUserId: number;

  constructor(
    private readonly authService: AuthService,
    private readonly searchService: SearchService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {

  }

  ngOnInit(): void {
    this.authService.authorized$.subscribe(async value => {
      if (value) {
        this.currentUserId = this.authService.userId;
        this.user = await this.userService.getUser(this.currentUserId).toPromise();
      } else {
        this.user = undefined;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  search(name: string): void {
    this.searchService.search(name);
    this.router.navigate(['/search'], {queryParams: {name}});
  }
}
