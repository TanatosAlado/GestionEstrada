import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAbonoComponent } from './asignar-abono.component';

describe('AsignarAbonoComponent', () => {
  let component: AsignarAbonoComponent;
  let fixture: ComponentFixture<AsignarAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarAbonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
