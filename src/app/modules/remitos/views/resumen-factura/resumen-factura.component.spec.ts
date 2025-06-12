import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenFacturaComponent } from './resumen-factura.component';

describe('ResumenFacturaComponent', () => {
  let component: ResumenFacturaComponent;
  let fixture: ComponentFixture<ResumenFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
