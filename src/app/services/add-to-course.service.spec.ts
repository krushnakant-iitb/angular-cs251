import { TestBed } from '@angular/core/testing';

import { AddToCourseService } from './add-to-course.service';

describe('AddToCourseService', () => {
  let service: AddToCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
