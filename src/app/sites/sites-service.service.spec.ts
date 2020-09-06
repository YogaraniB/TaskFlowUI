import { TestBed } from '@angular/core/testing';

import { SitesServiceService } from './sites-service.service';

describe('SitesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SitesServiceService = TestBed.get(SitesServiceService);
    expect(service).toBeTruthy();
  });
});
