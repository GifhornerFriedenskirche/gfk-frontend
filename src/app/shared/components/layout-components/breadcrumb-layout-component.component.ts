import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../core/interfaces/page.interface';
import { BaseService } from '../../../core/services/base.service';

export interface BreadcrumbItem {
  label: string;
  url: string;
  isActive: boolean;
}

@Component({
  selector: 'app-breadcrumb-layout-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="relative h-[60vh] w-full overflow-hidden">
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        [ngStyle]="backgroundStyle"
      >
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <!-- Content -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white z-10">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ pageTitle }}</h1>

          <!-- Breadcrumb Navigation -->
          <nav
            class="text-lg md:text-xl font-light mb-8"
            *ngIf="breadcrumbs.length > 0"
          >
            <ng-container
              *ngFor="let breadcrumb of breadcrumbs; let last = last"
            >
              <a
                *ngIf="!breadcrumb.isActive"
                [routerLink]="breadcrumb.url"
                class="text-orange-400 hover:text-orange-300 transition-colors"
              >
                {{ breadcrumb.label }}
              </a>
              <span *ngIf="breadcrumb.isActive" class="text-white">
                {{ breadcrumb.label }}
              </span>
              <span *ngIf="!last" class="mx-3 text-orange-400"> / </span>
            </ng-container>
          </nav>
        </div>
      </div>
    </div>
  `,
})
export class BreadcrumbLayoutComponent implements OnInit {
  @Input() component!: PageLayoutComponent;
  @Input() pageTitle: string = '';

  breadcrumbs: BreadcrumbItem[] = [];

  private baseService = inject(BaseService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private routeLabels: { [key: string]: string } = {
    '': 'Home',
    'unsere-gemeinde': 'Unsere Gemeinde',
    predigten: 'Predigten',
    gottesdienst: 'Gottesdienst',
    veranstaltungen: 'Veranstaltungen',
    kontakt: 'Kontakt',
    'ueber-uns': 'Über uns',
  };

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumbs(this.activatedRoute.root))
      )
      .subscribe((breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
      });

    // Initial load
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
  }

  get backgroundStyle() {
    const breadcrumbImageData = this.component?.data?.['breadcrumbImage'] as
      | { path?: string }
      | undefined;
    const imagePath = breadcrumbImageData?.path;
    return {
      'background-image': imagePath
        ? `url(${this.getFullImagePath(imagePath)})`
        : 'linear-gradient(to right, #ff8800, #ff4400)',
    };
  }

  private getFullImagePath(path: string): string {
    return `${this.baseService.getBaseImagePathUrl()}${path}`;
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] {
    // Add home if this is the first call
    if (breadcrumbs.length === 0) {
      breadcrumbs.push({
        label: 'Home',
        url: '/',
        isActive: false,
      });
    }

    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      // Mark the last breadcrumb as active
      if (breadcrumbs.length > 0) {
        breadcrumbs[breadcrumbs.length - 1].isActive = true;
      }
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;

        // Get label from route data or use page title or default mapping
        const label =
          child.snapshot.data['breadcrumb'] ||
          this.pageTitle ||
          this.getRouteLabel(routeURL);

        breadcrumbs.push({
          label,
          url,
          isActive: false,
        });
      }
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private getRouteLabel(route: string): string {
    return this.routeLabels[route] || this.formatRouteLabel(route);
  }

  private formatRouteLabel(route: string): string {
    return route
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
