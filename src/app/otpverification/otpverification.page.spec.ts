import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpverificationPage } from './otpverification.page';

describe('OtpverificationPage', () => {
  let component: OtpverificationPage;
  let fixture: ComponentFixture<OtpverificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpverificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpverificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
