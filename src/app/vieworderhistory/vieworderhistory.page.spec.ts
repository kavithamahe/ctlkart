import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VieworderhistoryPage } from './vieworderhistory.page';

describe('VieworderhistoryPage', () => {
  let component: VieworderhistoryPage;
  let fixture: ComponentFixture<VieworderhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VieworderhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VieworderhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
