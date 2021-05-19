import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserFriendsPage} from './user-friends.page';

describe('UserFriendsComponent', () => {
  let component: UserFriendsPage;
  let fixture: ComponentFixture<UserFriendsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFriendsPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
