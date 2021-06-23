import {Component, OnInit} from '@angular/core';
import {User} from '../../../../features/user/models/user.model';
import {UserService} from '../../../../features/user/services/user.service';
import {UserGlobalRoleService} from '../../../../features/user/services/user-global-role.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  moderators: User[];
  users: User[];

  votesOnStream = [];
  usersOnStream = [];
  registerUser = [];
  countStreams = [];

  constructor(
    private readonly userService: UserService,
    private readonly userGlobalRoleService: UserGlobalRoleService,
    private readonly http: HttpClient,
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.update();

    const votesOnStreamTemp = await this.http.get<any>(`${environment.apiUrl}/api/v1/statistic/votesOnStream`).toPromise();
    const votesOnStreamTemp2 = [];
    for (const key in votesOnStreamTemp) {
      if (votesOnStreamTemp.hasOwnProperty(key)) {
        votesOnStreamTemp2.push({name: key, value: votesOnStreamTemp[key]});
      }
    }
    this.votesOnStream = votesOnStreamTemp2;

    const usersOnStreamTemp = await this.http.get<any>(`${environment.apiUrl}/api/v1/statistic/usersOnStream`).toPromise();
    const usersOnStreamTemp2 = [];
    for (const key in usersOnStreamTemp) {
      if (usersOnStreamTemp.hasOwnProperty(key)) {
        usersOnStreamTemp2.push({name: key, value: usersOnStreamTemp[key]});
      }
    }
    this.usersOnStream = usersOnStreamTemp2;

    const countStreamsTemp = await this.http.get<any>(`${environment.apiUrl}/api/v1/statistic/countStreams`).toPromise();
    const countStreamsTemp2 = [];
    for (const key in countStreamsTemp) {
      if (countStreamsTemp.hasOwnProperty(key)) {
        countStreamsTemp2.push({name: key, value: countStreamsTemp[key]});
      }
    }
    this.countStreams = countStreamsTemp2;

    const registerUserTemp = await this.http.get<any>(`${environment.apiUrl}/api/v1/statistic/registerUser`).toPromise();
    const registerUserTemp2 = [];
    for (const key in registerUserTemp) {
      if (registerUserTemp.hasOwnProperty(key)) {
        registerUserTemp2.push({name: key, value: registerUserTemp[key]});
      }
    }
    this.registerUser = registerUserTemp2;
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
