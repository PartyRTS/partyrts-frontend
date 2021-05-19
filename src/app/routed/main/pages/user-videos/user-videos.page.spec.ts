import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserVideosPage} from './user-videos.page';

describe('UserVideosComponent', () => {
  let component: UserVideosPage;
  let fixture: ComponentFixture<UserVideosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserVideosPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
