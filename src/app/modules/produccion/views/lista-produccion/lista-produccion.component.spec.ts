import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProduccionComponent } from './lista-produccion.component';

describe('ListaProduccionComponent', () => {
  let component: ListaProduccionComponent;
  let fixture: ComponentFixture<ListaProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
