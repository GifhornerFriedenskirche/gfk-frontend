import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NavigationService } from './navigation.service';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NavigationService, BaseService, ErrorHandlerService],
    });
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have navigation menus observable', () => {
    expect(service.navigationMenus$).toBeDefined();
  });

  it('should have empty cached menus initially', () => {
    expect(service.getCachedNavigationMenus()).toEqual([]);
  });

  it('should clear cache', () => {
    service.clearCache();
    expect(service.getCachedNavigationMenus()).toEqual([]);
  });
});
