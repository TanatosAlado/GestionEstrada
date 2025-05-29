import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProductosComponent } from './alta-productos.component';

describe('AltaProductosComponent', () => {
  let component: AltaProductosComponent;
  let fixture: ComponentFixture<AltaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
