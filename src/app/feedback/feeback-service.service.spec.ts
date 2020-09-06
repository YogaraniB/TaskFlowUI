import { TestBed } from '@angular/core/testing';

import { FeebackServiceService } from './feeback-service.service';

describe('FeebackServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeebackServiceService = TestBed.get(FeebackServiceService);
    expect(service).toBeTruthy();
  });
});
