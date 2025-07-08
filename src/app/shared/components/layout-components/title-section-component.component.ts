import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../core/interfaces/page.interface';

/**
 * Title Section Component for use in dynamic layout system
 */
@Component({
  selector: 'app-title-section-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gray-50" *ngIf="hasValidContent()">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            {{ getHeadline() }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ getSubline() }}
          </p>
        </div>
      </div>
    </section>
  `,
})
export class TitleSectionComponent {
  @Input() component!: PageLayoutComponent;

  /**
   * Check if component has valid content to display
   */
  hasValidContent(): boolean {
    return !!(this.getHeadline() && this.getSubline());
  }

  /**
   * Get headline from component data
   */
  getHeadline(): string {
    return this.component?.data?.titleSectionHeadline || '';
  }

  /**
   * Get subline from component data
   */
  getSubline(): string {
    return this.component?.data?.titleSectionSubline || '';
  }
}
