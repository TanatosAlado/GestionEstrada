import { TestBed } from '@angular/core/testing';

import { AbonosClientesService } from './abonos-clientes.service';

describe('AbonosClientesService', () => {
  let service: AbonosClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonosClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
