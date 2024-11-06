import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessLogsPage } from './access-logs.page';

describe('AccessLogsPage', () => {
  let component: AccessLogsPage;
  let fixture: ComponentFixture<AccessLogsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
