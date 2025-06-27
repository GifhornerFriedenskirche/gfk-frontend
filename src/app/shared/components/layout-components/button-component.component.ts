import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../core/interfaces/page.interface';

@Component({
  selector: 'app-button-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center">
      <a
        [href]="component.data.url || '#'"
        [target]="component.data.target === '_blank' ? '_blank' : '_self'"
        class="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        {{ component.data.caption || component.label }}
      </a>
    </div>
  `
})
export class ButtonComponent {
  @Input() component!: PageLayoutComponent;
}
