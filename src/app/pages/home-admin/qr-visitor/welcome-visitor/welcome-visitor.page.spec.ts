import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeVisitorPage } from './welcome-visitor.page';

describe('WelcomeVisitorPage', () => {
  let component: WelcomeVisitorPage;
  let fixture: ComponentFixture<WelcomeVisitorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeVisitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
