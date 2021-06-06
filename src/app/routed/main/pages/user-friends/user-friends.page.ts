import {Component, OnInit} from '@angular/core';
import {User} from '../../../../features/user/models/user.model';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.page.html',
  styleUrls: ['./user-friends.page.scss']
})
export class UserFriendsPage implements OnInit {

  friends: User[] = [
    {
      idUser: 1,
      email: 'kolesov.anton.s@gmail.com',
      birthdayDate: new Date(),
      description: 'bla bla lba',
      firstName: 'Anton',
      secondName: 'Kolesov',
      logoUrl: 'https://www.goha.ru/s/A:NX/Xj/utWvPIbVmY.jpg',
      registrationDate: new Date(),
    },
    {
      idUser: 1,
      email: 'kolesov.anton.s@gmail.com',
      birthdayDate: new Date(),
      description: 'bla bla lba',
      firstName: 'Anton',
      secondName: 'Kolesov',
      logoUrl: 'https://www.goha.ru/s/A:NX/Xj/utWvPIbVmY.jpg',
      registrationDate: new Date(),
    },
  ];
  friendRequests: User[] = [
    {
      idUser: 1,
      email: 'kolesov.anton.s@gmail.com',
      birthdayDate: new Date(),
      description: 'bla bla lba',
      firstName: 'Anton',
      secondName: 'Kolesov',
      logoUrl: 'https://www.goha.ru/s/A:NX/Xj/utWvPIbVmY.jpg',
      registrationDate: new Date(),
    },
    {
      idUser: 1,
      email: 'kolesov.anton.s@gmail.com',
      birthdayDate: new Date(),
      description: 'bla bla lba',
      firstName: 'Anton',
      secondName: 'Kolesov',
      logoUrl: 'https://www.goha.ru/s/A:NX/Xj/utWvPIbVmY.jpg',
      registrationDate: new Date(),
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
