import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitorRegistrationPage } from './visitor-registration.page';

describe('VisitorRegistrationPage', () => {
  let component: VisitorRegistrationPage;
  let fixture: ComponentFixture<VisitorRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
