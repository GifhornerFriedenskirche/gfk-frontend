import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../core/interfaces/page.interface';
import { ButtonComponent } from '../layout-components/button-component.component';
import { ImageComponent } from '../layout-components/image-component.component';
import { BreadcrumbLayoutComponent } from '../layout-components/breadcrumb-layout-component.component';

@Component({
  selector: 'app-dynamic-layout',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ImageComponent,
    BreadcrumbLayoutComponent,
  ],
  template: `
    <div [class]="cssClass">
      <div *ngFor="let component of components" class="mb-8">
        <!-- Regular components with container -->
        <div
          *ngIf="component.component !== 'breadcrumbComp'"
          class="container mx-auto px-4"
        >
          <app-button-component
            *ngIf="component.component === 'button'"
            [component]="component"
          >
          </app-button-component>

          <app-image-component
            *ngIf="component.component === 'image'"
            [component]="component"
          >
          </app-image-component>
        </div>

        <!-- Breadcrumb component without container (full-width) -->
        <app-breadcrumb-layout-component
          *ngIf="component.component === 'breadcrumbComp'"
          [component]="component"
          [pageTitle]="pageTitle"
        >
        </app-breadcrumb-layout-component>
      </div>
    </div>
  `,
})
export class DynamicLayoutComponent {
  @Input() components: PageLayoutComponent[] = [];
  @Input() cssClass: string = 'py-12 bg-gray-50';
  @Input() pageTitle: string = '';
}
