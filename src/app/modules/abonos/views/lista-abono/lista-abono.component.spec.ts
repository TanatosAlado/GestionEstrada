import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAbonoComponent } from './lista-abono.component';

describe('ListaAbonoComponent', () => {
  let component: ListaAbonoComponent;
  let fixture: ComponentFixture<ListaAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAbonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
