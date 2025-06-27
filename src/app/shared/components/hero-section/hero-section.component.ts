import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../core/services/base.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  template: `
    <div class="relative h-[70vh] w-full overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        [ngStyle]="backgroundStyle"
      >
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white z-10">
          <h1 class="text-5xl md:text-6xl font-bold mb-6">{{ title }}</h1>
          <app-breadcrumb></app-breadcrumb>
        </div>
      </div>
    </div>
  `,
})
export class HeroSectionComponent {
  @Input() title!: string;
  @Input() backgroundImage?: string;

  private baseService = inject(BaseService);

  get backgroundStyle() {
    return {
      'background-image': this.backgroundImage
        ? `url(${this.getFullImagePath(this.backgroundImage)})`
        : 'linear-gradient(to right, #ff8800, #ff4400)',
    };
  }

  private getFullImagePath(path: string): string {
    return `${this.baseService.getBaseImagePathUrl()}${path}`;
  }
}
