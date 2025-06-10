import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

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
})
export class HeaderNavigationComponent implements OnInit {
  menuItems: Link[] = [];
  loading$: Observable<boolean>;
  hasError: boolean = false;
  errorMessage: string = '';

  private readonly navigationService = inject(NavigationService);
  private readonly loadingService = inject(LoadingService);

  constructor() {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.loadNavigationData();
  }

  private loadNavigationData(): void {
    this.hasError = false;
    this.errorMessage = '';

    this.navigationService.getNavigationMenus().subscribe({
      next: (data: NavigationMenu[]) => {
        this.menuItems = data[0]?.links || [];
        this.hasError = false;
      },      error: (error) => {
        this.hasError = true;
        this.errorMessage = error.message || MESSAGES.ERROR.NAVIGATION_LOAD;
        this.menuItems = [];
      },
    });
  }
  retryLoad(): void {
    this.loadNavigationData();
  }
}
