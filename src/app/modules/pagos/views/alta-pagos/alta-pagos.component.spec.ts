import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPagosComponent } from './alta-pagos.component';

describe('AltaPagosComponent', () => {
  let component: AltaPagosComponent;
  let fixture: ComponentFixture<AltaPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaPagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
