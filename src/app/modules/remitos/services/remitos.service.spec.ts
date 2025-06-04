import { TestBed } from '@angular/core/testing';

import { RemitosService } from './remitos.service';

describe('RemitosService', () => {
  let service: RemitosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemitosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
