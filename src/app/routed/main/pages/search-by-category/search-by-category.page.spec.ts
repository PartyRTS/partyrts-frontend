import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchByCategoryPage} from './search-by-category.page';

describe('SearchByCategoryPage', () => {
  let component: SearchByCategoryPage;
  let fixture: ComponentFixture<SearchByCategoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchByCategoryPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
