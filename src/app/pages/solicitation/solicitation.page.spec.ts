import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitationPage } from './solicitation.page';

describe('SolicitationPage', () => {
  let component: SolicitationPage;
  let fixture: ComponentFixture<SolicitationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SolicitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
