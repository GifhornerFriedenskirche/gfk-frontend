import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLoaderComponent } from './skeleton-loader.component';

@Component({
  selector: 'app-navigation-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent],
  template: `
    <nav class="navbar bg-base-100 shadow-lg">
      <div class="navbar-start">
        <!-- Logo skeleton -->
        <app-skeleton-loader variant="title" width="120px" height="2rem">
        </app-skeleton-loader>
      </div>

      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-4">
          <li *ngFor="let item of [1, 2, 3, 4]">
            <app-skeleton-loader variant="button" width="80px" height="2rem">
            </app-skeleton-loader>
          </li>
        </ul>
      </div>

      <div class="navbar-end">
        <app-skeleton-loader variant="button" width="100px" height="2.5rem">
        </app-skeleton-loader>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        padding: 1rem 2rem;
      }
    `,
  ],
})
export class NavigationSkeletonComponent {}
