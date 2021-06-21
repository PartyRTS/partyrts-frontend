import {Component, OnInit} from '@angular/core';
import {User} from '../../../../features/user/models/user.model';
import {UserService} from '../../../../features/user/services/user.service';
import {dataExample} from './data';
import {UserGlobalRoleService} from '../../../../features/user/services/user-global-role.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  moderators: User[];
  users: User[];

  data = dataExample;

  constructor(
    private readonly userService: UserService,
    private readonly userGlobalRoleService: UserGlobalRoleService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.update();
  }

  async update(): Promise<void> {
    this.users = await this.userService.getAllUsers().toPromise();

    const moderators = [];

    for (const user of this.users) {
      const userRoles = await this.userGlobalRoleService.getAllGlobalRoles(user.idUser).toPromise();
      if (userRoles.some(value => value.idGlobalRole === 3)) {
        moderators.push(user);
      }
    }
    this.moderators = moderators;
  }

  async deleteModeratorRole(userId: number): Promise<void> {
    await this.userGlobalRoleService.deleteGlobalRole(userId, 3).toPromise();
    await this.update();
  }

  async addModeratorRole(userId: number): Promise<void> {
    await this.userGlobalRoleService.addGlobalRole(userId, 3).toPromise();
    await this.update();
  }

  async banUser(userId: any): Promise<void> {
    await this.userService.setBanned(userId, true).toPromise();
    await this.update();
  }

  async unbanUser(userId: any): Promise<void> {
    await this.userService.setBanned(userId, false).toPromise();
    await this.update();
  }

}
