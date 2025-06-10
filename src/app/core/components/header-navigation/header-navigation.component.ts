import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { NavigationService } from '../../services/navigation.service';
import { LoadingService } from '../../services/loading.service';
import { Link, NavigationMenu } from '../../interfaces/menu.interface';
import { NavigationSkeletonComponent } from '../../../shared/components/navigation-skeleton.component';
import { MESSAGES } from '../../constants/app.constants';

@Component({
  selector: 'app-header-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationSkeletonComponent],
  templateUrl: './header-navigation.component.html',
  styleUrl: './header-navigation.component.scss',
})
export class HeaderNavigationComponent implements OnInit, OnDestroy {
  menuItems: Link[] = [];
  loading$: Observable<boolean>;
  hasError: boolean = false;
  errorMessage: string = '';

  // Show loading only when there's no cached data
  showLoading$: Observable<boolean>;

  private readonly navigationService = inject(NavigationService);
  private readonly loadingService = inject(LoadingService);
  private subscription = new Subscription();

  constructor() {
    this.loading$ = this.loadingService.loading$;

    // Combine loading state with cached data availability
    this.showLoading$ = combineLatest([
      this.loading$,
      this.navigationService.navigationMenus$.pipe(startWith([])),
    ]).pipe(
      map(([isLoading, cachedMenus]) => isLoading && cachedMenus.length === 0)
    );

    // Subscribe to cached navigation data
    this.subscription.add(
      this.navigationService.navigationMenus$.subscribe((menus) => {
        if (menus.length > 0) {
          this.menuItems = menus[0]?.links || [];
          this.hasError = false;
        }
      })
    );
  }
  ngOnInit(): void {
    this.loadNavigationData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadNavigationData(): void {
    this.hasError = false;
    this.errorMessage = '';

    // Check if we have cached data first
    const cachedMenus = this.navigationService.getCachedNavigationMenus();
    if (cachedMenus.length > 0) {
      this.menuItems = cachedMenus[0]?.links || [];
      return;
    }

    // Load data if not cached
    this.subscription.add(
      this.navigationService.getNavigationMenus().subscribe({
        next: (data: NavigationMenu[]) => {
          this.menuItems = data[0]?.links || [];
          this.hasError = false;
        },
        error: (error) => {
          this.hasError = true;
          this.errorMessage = error.message || MESSAGES.ERROR.NAVIGATION_LOAD;
          this.menuItems = [];
        },
      })
    );
  }

  retryLoad(): void {
    this.navigationService.clearCache();
    this.loadNavigationData();
  }
}
