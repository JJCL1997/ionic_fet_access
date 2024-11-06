import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitorDetailsPage } from './visitor-details.page';

describe('VisitorDetailsPage', () => {
  let component: VisitorDetailsPage;
  let fixture: ComponentFixture<VisitorDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
