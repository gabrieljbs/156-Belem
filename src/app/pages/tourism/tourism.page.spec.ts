import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourismPage } from './tourism.page';

describe('TourismPage', () => {
  let component: TourismPage;
  let fixture: ComponentFixture<TourismPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TourismPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
