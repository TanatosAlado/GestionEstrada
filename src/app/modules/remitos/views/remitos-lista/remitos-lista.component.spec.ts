import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitosListaComponent } from './remitos-lista.component';

describe('RemitosListaComponent', () => {
  let component: RemitosListaComponent;
  let fixture: ComponentFixture<RemitosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemitosListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemitosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
