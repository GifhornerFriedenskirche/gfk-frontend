import { Component } from '@angular/core';
import { SkeletonLoaderComponent } from './skeleton-loader.component';

@Component({
  selector: 'app-hero-skeleton',
  standalone: true,
  imports: [SkeletonLoaderComponent],
  template: `
    <div class="hero min-h-screen bg-base-200 flex items-center justify-center">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <!-- Title skeleton -->
          <app-skeleton-loader 
            variant="title" 
            width="300px" 
            height="3rem"
            skeletonClass="mb-5">
          </app-skeleton-loader>
          
          <!-- Paragraph skeleton -->
          <app-skeleton-loader 
            variant="text" 
            width="100%" 
            height="1.2rem"
            skeletonClass="mb-2">
          </app-skeleton-loader>
          
          <app-skeleton-loader 
            variant="text" 
            width="80%" 
            height="1.2rem"
            skeletonClass="mb-2">
          </app-skeleton-loader>
          
          <app-skeleton-loader 
            variant="text" 
            width="90%" 
            height="1.2rem"
            skeletonClass="mb-5">
          </app-skeleton-loader>
          
          <!-- Button skeleton -->
          <app-skeleton-loader 
            variant="button" 
            width="200px" 
            height="3rem">
          </app-skeleton-loader>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(45deg, #f8f9fa, #e9ecef);
    }
  `]
})
export class HeroSkeletonComponent {}
