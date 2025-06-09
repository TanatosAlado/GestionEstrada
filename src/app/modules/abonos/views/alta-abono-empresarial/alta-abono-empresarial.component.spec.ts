import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAbonoEmpresarialComponent } from './alta-abono-empresarial.component';

describe('AltaAbonoEmpresarialComponent', () => {
  let component: AltaAbonoEmpresarialComponent;
  let fixture: ComponentFixture<AltaAbonoEmpresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaAbonoEmpresarialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaAbonoEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
