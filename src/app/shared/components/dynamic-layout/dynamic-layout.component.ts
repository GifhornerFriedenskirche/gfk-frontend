import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../core/interfaces/page.interface';
import { ButtonComponent } from '../layout-components/button-component.component';
import { ImageComponent } from '../layout-components/image-component.component';

@Component({
  selector: 'app-dynamic-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ImageComponent],
  template: `
    <div [class]="cssClass">
      <div class="container mx-auto px-4">
        <div *ngFor="let component of components" class="mb-8">
          <app-button-component 
            *ngIf="component.component === 'button'" 
            [component]="component">
          </app-button-component>
          
          <app-image-component 
            *ngIf="component.component === 'image'" 
            [component]="component">
          </app-image-component>
        </div>
      </div>
    </div>
  `
})
export class DynamicLayoutComponent {
  @Input() components: PageLayoutComponent[] = [];
  @Input() cssClass: string = 'py-12 bg-gray-50';
}
