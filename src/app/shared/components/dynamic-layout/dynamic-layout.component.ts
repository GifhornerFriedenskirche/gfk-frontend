import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../core/interfaces/page.interface';
import { ButtonComponent } from '../layout-components/button-component.component';
import { ImageComponent } from '../layout-components/image-component.component';
import { BreadcrumbLayoutComponent } from '../layout-components/breadcrumb-layout-component.component';
import { TitleSectionComponent } from '../layout-components/title-section-component.component';
import { TextImageComponent } from '../layout-components/text-image-component/text-image-component.component';
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
    TextImageComponent,
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

        <!-- Text-Image component (full width) -->
        <app-text-image-component
          *ngIf="isTextImageComponent(component)"
          [component]="component"
          [index]="getComponentIndex(component)"
        >
        </app-text-image-component>

        <!-- Debug output for development -->
        <!-- 
        <div *ngIf="isTextImageComponent(component)" class="text-sm text-gray-500 py-2 text-center">
          Debug: Component {{ component.id }} has index {{ getComponentIndex(component) }}
        </div>
        -->

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

  /**
   * Check if component is a text-image component
   */
  isTextImageComponent(component: PageLayoutComponent): boolean {
    return component.component === LAYOUT_COMPONENT_TYPES.TEXT_IMAGE;
  }

  /**
   * Get the index of a component type to determine layout pattern
   * This allows alternating layouts for consecutive components of the same type
   */
  getComponentIndex(component: PageLayoutComponent): number {
    if (!this.components || !this.components.length) return 0;

    // Get all text-image components in the current layout
    const textImageComponents = this.components.filter(
      (comp) => comp.component === LAYOUT_COMPONENT_TYPES.TEXT_IMAGE
    );

    // Find the position of this specific component in the filtered array by its ID
    const index = textImageComponents.findIndex(
      (comp) => comp.id === component.id
    );

    // Ensure we return a valid number (0 for the first component, or the found index)
    // Force a numeric value with parseInt to avoid any string/number confusion
    return index >= 0 ? parseInt(index.toString(), 10) : 0;
  }
}
