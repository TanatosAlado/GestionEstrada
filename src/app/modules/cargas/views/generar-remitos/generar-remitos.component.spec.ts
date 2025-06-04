import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRemitosComponent } from './generar-remitos.component';

describe('GenerarRemitosComponent', () => {
  let component: GenerarRemitosComponent;
  let fixture: ComponentFixture<GenerarRemitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarRemitosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarRemitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
