import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrVisitorPage } from './qr-visitor.page';

describe('QrVisitorPage', () => {
  let component: QrVisitorPage;
  let fixture: ComponentFixture<QrVisitorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrVisitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
