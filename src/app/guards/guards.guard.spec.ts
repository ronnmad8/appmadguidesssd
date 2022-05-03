import { TestBed, async, inject } from '@angular/core/testing';

import { GuardsGuard } from './auth.guard';

describe('GuardsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardsGuard]
    });
  });

  it('should ...', inject([GuardsGuard], (guard: GuardsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
