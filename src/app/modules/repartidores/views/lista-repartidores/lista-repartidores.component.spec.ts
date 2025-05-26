import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRepartidoresComponent } from './lista-repartidores.component';

describe('ListaRepartidoresComponent', () => {
  let component: ListaRepartidoresComponent;
  let fixture: ComponentFixture<ListaRepartidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRepartidoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
