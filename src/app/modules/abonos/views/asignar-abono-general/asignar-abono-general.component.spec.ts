import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAbonoGeneralComponent } from './asignar-abono-general.component';

describe('AsignarAbonoGeneralComponent', () => {
  let component: AsignarAbonoGeneralComponent;
  let fixture: ComponentFixture<AsignarAbonoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarAbonoGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarAbonoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
