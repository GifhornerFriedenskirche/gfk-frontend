import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../core/interfaces/page.interface';
import { BaseService } from '../../../core/services/base.service';

@Component({
  selector: 'app-image-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center">
      <img
        *ngIf="component.data.asset"
        [src]="getFullImagePath(component.data.asset.path)"
        [alt]="component.data.asset.title || component.label"
        class="max-w-full h-auto rounded-lg shadow-lg mx-auto"
      />
    </div>
  `,
})
export class ImageComponent {
  @Input() component!: PageLayoutComponent;

  private baseService = inject(BaseService);

  getFullImagePath(path: string): string {
    return `${this.baseService.getBaseImagePathUrl()}${path}`;
  }
}
