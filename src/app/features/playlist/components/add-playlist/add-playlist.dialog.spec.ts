import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddPlaylistDialog} from './add-playlist.dialog';

describe('AddPlaylistDialog', () => {
  let component: AddPlaylistDialog;
  let fixture: ComponentFixture<AddPlaylistDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPlaylistDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlaylistDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
