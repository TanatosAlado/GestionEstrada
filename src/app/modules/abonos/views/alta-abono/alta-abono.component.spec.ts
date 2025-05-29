import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAbonoComponent } from './alta-abono.component';

describe('AltaAbonoComponent', () => {
  let component: AltaAbonoComponent;
  let fixture: ComponentFixture<AltaAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaAbonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
