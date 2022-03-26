/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HandleDataService } from './handle-data.service';

describe('Service: HandleData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleDataService]
    });
  });

  it('should ...', inject([HandleDataService], (service: HandleDataService) => {
    expect(service).toBeTruthy();
  }));
});
