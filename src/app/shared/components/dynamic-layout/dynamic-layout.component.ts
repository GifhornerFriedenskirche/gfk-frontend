import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../core/interfaces/page.interface';
import { ButtonComponent } from '../layout-components/button-component.component';
import { ImageComponent } from '../layout-components/image-component.component';
import { BreadcrumbLayoutComponent } from '../layout-components/breadcrumb-layout-component.component';
import { TitleSectionComponent } from '../layout-components/title-section-component.component';
import {
  LAYOUT_COMPONENT_TYPES,
  LAYOUT_CSS_CLASSES,
} from '../../../core/constants/app.constants';

@Component({
  selector: 'app-dynamic-layout',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ImageComponent,
    BreadcrumbLayoutComponent,
    TitleSectionComponent,
  ],
  template: `
    <div [class]="cssClass">
      <div *ngFor="let component of components" class="mb-8">
        <!-- Regular components with container -->
        <div
          *ngIf="
            !isBreadcrumbComponent(component) &&
            !isTitleSectionComponent(component)
          "
          class="container mx-auto px-4"
        >
          <app-button-component
            *ngIf="isButtonComponent(component)"
            [component]="component"
          >
          </app-button-component>

          <app-image-component
            *ngIf="isImageComponent(component)"
            [component]="component"
          >
          </app-image-component>
        </div>

        <!-- Full-width components without container -->
        <app-title-section-component
          *ngIf="isTitleSectionComponent(component)"
          [component]="component"
        >
        </app-title-section-component>

        <!-- Breadcrumb component without container (full-width) -->
        <app-breadcrumb-layout-component
          *ngIf="isBreadcrumbComponent(component)"
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
  @Input() cssClass: string = LAYOUT_CSS_CLASSES.DEFAULT;
  @Input() pageTitle: string = '';

  /**
   * Check if component is a breadcrumb component
   */
  isBreadcrumbComponent(component: PageLayoutComponent): boolean {
    return component.component === LAYOUT_COMPONENT_TYPES.BREADCRUMB;
  }

  /**
   * Check if component is a button component
   */
  isButtonComponent(component: PageLayoutComponent): boolean {
    return component.component === LAYOUT_COMPONENT_TYPES.BUTTON;
  }

  /**
   * Check if component is an image component
   */
  isImageComponent(component: PageLayoutComponent): boolean {
    return component.component === LAYOUT_COMPONENT_TYPES.IMAGE;
  }

  /**
   * Check if component is a title section component
   */
  isTitleSectionComponent(component: PageLayoutComponent): boolean {
    return component.component === LAYOUT_COMPONENT_TYPES.TITLE_SECTION;
  }
}
