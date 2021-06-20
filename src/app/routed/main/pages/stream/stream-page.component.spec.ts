import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StreamPage} from './stream-page.component';

describe('RoomPage', () => {
  let component: StreamPage;
  let fixture: ComponentFixture<StreamPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
