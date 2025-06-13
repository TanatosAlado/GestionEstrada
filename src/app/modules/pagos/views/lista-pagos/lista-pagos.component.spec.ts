import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPagosComponent } from './lista-pagos.component';

describe('ListaPagosComponent', () => {
  let component: ListaPagosComponent;
  let fixture: ComponentFixture<ListaPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
