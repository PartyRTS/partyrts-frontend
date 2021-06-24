import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../../user/models/user.model';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {UserService} from '../../../user/services/user.service';
import {UserGlobalRoleService} from '../../../user/services/user-global-role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;

  isModerator = false;

  private currentUserId: number;

  constructor(
    private readonly authService: AuthService,
    private readonly searchService: SearchService,
    private readonly userService: UserService,
    private readonly userGlobalRoleService: UserGlobalRoleService,
    private readonly router: Router,
  ) {

  }

  ngOnInit(): void {
    this.authService.authorized$.subscribe(async value => {
      if (value) {
        this.currentUserId = this.authService.userId;
        this.user = await this.userService.getUser(this.currentUserId).toPromise();
        const roles = await this.userGlobalRoleService.getAllGlobalRoles(this.currentUserId).toPromise();
        console.log(roles);
        if (roles.some(role => role.idGlobalRole === 3)) {
          this.isModerator = true;
        }
      } else {
        this.user = undefined;
        this.isModerator = false;
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
