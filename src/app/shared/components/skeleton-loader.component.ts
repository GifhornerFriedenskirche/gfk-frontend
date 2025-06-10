import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-loader" [ngClass]="skeletonClass">
      <div class="skeleton-item" 
           [style.width]="width" 
           [style.height]="height"
           [ngClass]="variant">
      </div>
    </div>
  `,  styles: [`
    .skeleton-loader {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      animation: fadeIn 0.3s ease-in;
    }

    .skeleton-item {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .skeleton-item.text {
      height: 1rem;
      border-radius: 4px;
    }

    .skeleton-item.title {
      height: 2rem;
      border-radius: 6px;
    }

    .skeleton-item.avatar {
      border-radius: 50%;
    }

    .skeleton-item.card {
      border-radius: 8px;
      height: 200px;
    }

    .skeleton-item.button {
      height: 2.5rem;
      border-radius: 6px;
    }

    @keyframes skeleton-loading {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dark-theme .skeleton-item {
      background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
      background-size: 200% 100%;
    }
  `]
})
export class SkeletonLoaderComponent {
  @Input() width: string = '100%';
  @Input() height: string = '1rem';
  @Input() variant: 'text' | 'title' | 'avatar' | 'card' | 'button' = 'text';
  @Input() skeletonClass: string = '';
}
