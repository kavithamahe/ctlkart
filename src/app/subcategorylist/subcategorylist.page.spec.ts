import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorylistPage } from './subcategorylist.page';

describe('SubcategorylistPage', () => {
  let component: SubcategorylistPage;
  let fixture: ComponentFixture<SubcategorylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategorylistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategorylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
