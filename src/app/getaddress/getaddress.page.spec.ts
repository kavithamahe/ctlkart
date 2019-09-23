import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetaddressPage } from './getaddress.page';

describe('GetaddressPage', () => {
  let component: GetaddressPage;
  let fixture: ComponentFixture<GetaddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetaddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
