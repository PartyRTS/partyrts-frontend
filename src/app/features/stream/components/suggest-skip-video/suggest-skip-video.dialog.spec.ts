import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SuggestSkipVideoDialog} from './suggest-skip-video.dialog';

describe('SuggestSkipVideoDialog', () => {
  let component: SuggestSkipVideoDialog;
  let fixture: ComponentFixture<SuggestSkipVideoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestSkipVideoDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestSkipVideoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
