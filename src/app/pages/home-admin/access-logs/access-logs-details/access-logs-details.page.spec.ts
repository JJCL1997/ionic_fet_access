import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessLogsDetailsPage } from './access-logs-details.page';

describe('AccessLogsDetailsPage', () => {
  let component: AccessLogsDetailsPage;
  let fixture: ComponentFixture<AccessLogsDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLogsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
