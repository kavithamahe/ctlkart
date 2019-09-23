import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildcategoryPage } from './childcategory.page';

describe('ChildcategoryPage', () => {
  let component: ChildcategoryPage;
  let fixture: ComponentFixture<ChildcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
