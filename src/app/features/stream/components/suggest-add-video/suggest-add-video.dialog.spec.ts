import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SuggestAddVideoDialog} from './suggest-add-video.dialog';

describe('SuggestAddVideoDialog', () => {
  let component: SuggestAddVideoDialog;
  let fixture: ComponentFixture<SuggestAddVideoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestAddVideoDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestAddVideoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
