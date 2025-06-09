import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAbonosComponent } from './ver-abonos.component';

describe('VerAbonosComponent', () => {
  let component: VerAbonosComponent;
  let fixture: ComponentFixture<VerAbonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAbonosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAbonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
