import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRemitoComponent } from './detalle-remito.component';

describe('DetalleRemitoComponent', () => {
  let component: DetalleRemitoComponent;
  let fixture: ComponentFixture<DetalleRemitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleRemitoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleRemitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
