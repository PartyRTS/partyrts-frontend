import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FriendElementComponent} from './friend-element.component';

describe('FriendElementComponent', () => {
  let component: FriendElementComponent;
  let fixture: ComponentFixture<FriendElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendElementComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
