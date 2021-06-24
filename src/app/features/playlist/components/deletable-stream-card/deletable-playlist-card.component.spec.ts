import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeletablePlaylistCardComponent} from './deletable-playlist-card.component';

describe('DeletableStreamCardComponent', () => {
  let component: DeletablePlaylistCardComponent;
  let fixture: ComponentFixture<DeletablePlaylistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletablePlaylistCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletablePlaylistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
