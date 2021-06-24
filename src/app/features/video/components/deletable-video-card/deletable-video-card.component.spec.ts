import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeletableVideoCardComponent} from './deletable-video-card.component';

describe('DeletableVideoCardComponent', () => {
  let component: DeletableVideoCardComponent;
  let fixture: ComponentFixture<DeletableVideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletableVideoCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletableVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
