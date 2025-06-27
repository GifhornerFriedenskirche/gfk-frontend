import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url: string;
  isActive: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav
      class="text-lg md:text-xl font-light mb-8"
      *ngIf="breadcrumbs.length > 0"
    >
      <ng-container *ngFor="let breadcrumb of breadcrumbs; let last = last">
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
  `,
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];

  private routeLabels: { [key: string]: string } = {
    '': 'Home',
    'unsere-gemeinde': 'Unsere Gemeinde',
    gottesdienst: 'Gottesdienst',
    veranstaltungen: 'Veranstaltungen',
    kontakt: 'Kontakt',
    'ueber-uns': 'Über uns',
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

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
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;

        // Get label from route data or use default mapping
        const label =
          child.snapshot.data['breadcrumb'] || this.getRouteLabel(routeURL);

        breadcrumbs.push({
          label,
          url,
          isActive: false,
        });
      }
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    // Mark the last breadcrumb as active
    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].isActive = true;
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
