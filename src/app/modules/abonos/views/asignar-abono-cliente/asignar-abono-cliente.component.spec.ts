import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAbonoClienteComponent } from './asignar-abono-cliente.component';

describe('AsignarAbonoClienteComponent', () => {
  let component: AsignarAbonoClienteComponent;
  let fixture: ComponentFixture<AsignarAbonoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarAbonoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarAbonoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
