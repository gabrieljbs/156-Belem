import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexoPage } from './anexo.page';

describe('AnexoPage', () => {
  let component: AnexoPage;
  let fixture: ComponentFixture<AnexoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnexoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
