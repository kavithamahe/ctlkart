import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaddressPage } from './addaddress.page';

describe('AddaddressPage', () => {
  let component: AddaddressPage;
  let fixture: ComponentFixture<AddaddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddaddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
