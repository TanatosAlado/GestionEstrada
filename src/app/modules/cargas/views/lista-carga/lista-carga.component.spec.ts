import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCargaComponent } from './lista-carga.component';

describe('ListaCargaComponent', () => {
  let component: ListaCargaComponent;
  let fixture: ComponentFixture<ListaCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
