import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { appGuards } from './app-guards.guard';

describe('appGuards', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => appGuards(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
