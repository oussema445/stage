import { TestBed } from '@angular/core/testing';

import { ImageCategService } from './image-categ.service';

describe('ImageCategService', () => {
  let service: ImageCategService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCategService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
