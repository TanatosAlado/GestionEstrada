import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAbonoGeneralComponent } from './alta-abono-general.component';

describe('AltaAbonoGeneralComponent', () => {
  let component: AltaAbonoGeneralComponent;
  let fixture: ComponentFixture<AltaAbonoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaAbonoGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaAbonoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
