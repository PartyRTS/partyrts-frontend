import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddStreamDialog} from './add-stream.dialog';

describe('AddStreamDialog', () => {
  let component: AddStreamDialog;
  let fixture: ComponentFixture<AddStreamDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStreamDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStreamDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
