import { TestBed } from '@angular/core/testing';

import { QuenaService } from './quena.service';

describe('QuenaService', () => {
  let service: QuenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
