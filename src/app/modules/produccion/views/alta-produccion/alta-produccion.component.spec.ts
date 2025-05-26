import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProduccionComponent } from './alta-produccion.component';

describe('AltaProduccionComponent', () => {
  let component: AltaProduccionComponent;
  let fixture: ComponentFixture<AltaProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
