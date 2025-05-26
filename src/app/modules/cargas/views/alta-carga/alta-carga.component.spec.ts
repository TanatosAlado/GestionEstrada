import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCargaComponent } from './alta-carga.component';

describe('AltaCargaComponent', () => {
  let component: AltaCargaComponent;
  let fixture: ComponentFixture<AltaCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
