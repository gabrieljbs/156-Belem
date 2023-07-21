import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NewSolicitationPage } from './new-solicitation.page';

describe('NewSolicitationPage', () => {
  let component: NewSolicitationPage;
  let fixture: ComponentFixture<NewSolicitationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewSolicitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
