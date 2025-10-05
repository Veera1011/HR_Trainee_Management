import { TestBed } from '@angular/core/testing';

import { Traineeservice } from './traineeservice';

describe('Traineeservice', () => {
  let service: Traineeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Traineeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
