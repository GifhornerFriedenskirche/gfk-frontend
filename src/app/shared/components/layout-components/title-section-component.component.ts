import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../core/interfaces/page.interface';

@Component({
  selector: 'app-title-section-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            {{ component.data['titleSectionHeadline'] || component.label }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ component.data['titleSectionSubline'] || '' }}
          </p>
        </div>
      </div>
    </section>
  `,
})
export class TitleSectionComponent {
  @Input() component!: PageLayoutComponent;
}
