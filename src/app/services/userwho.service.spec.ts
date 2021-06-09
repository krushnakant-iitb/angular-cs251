import { TestBed } from '@angular/core/testing';

import { UserwhoService } from './userwho.service';

describe('UserwhoService', () => {
  let service: UserwhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserwhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
