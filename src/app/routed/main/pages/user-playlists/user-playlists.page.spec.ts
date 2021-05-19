import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPlaylistsPage} from './user-playlists.page';

describe('UserPlaylistsComponent', () => {
  let component: UserPlaylistsPage;
  let fixture: ComponentFixture<UserPlaylistsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPlaylistsPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlaylistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
