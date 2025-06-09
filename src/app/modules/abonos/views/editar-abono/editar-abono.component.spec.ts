import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAbonoComponent } from './editar-abono.component';

describe('EditarAbonoComponent', () => {
  let component: EditarAbonoComponent;
  let fixture: ComponentFixture<EditarAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAbonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
