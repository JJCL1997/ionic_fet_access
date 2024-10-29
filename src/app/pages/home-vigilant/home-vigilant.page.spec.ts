import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeVigilantPage } from './home-vigilant.page';

describe('HomeVigilantPage', () => {
  let component: HomeVigilantPage;
  let fixture: ComponentFixture<HomeVigilantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVigilantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
