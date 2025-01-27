import { TestBed } from '@angular/core/testing';

import { PieceGuard } from './piece.guard';

describe('PieceGuard', () => {
  let guard: PieceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PieceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
