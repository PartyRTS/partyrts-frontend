import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from '../../services/current-user.service';
import {User} from '../../../user/models/user.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly authService: AuthService,
    private readonly searchService: SearchService,
    private readonly router: Router,
  ) {

  }

  ngOnInit(): void {
    this.currentUserService.user$.subscribe(value => {
      this.user = value;
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
