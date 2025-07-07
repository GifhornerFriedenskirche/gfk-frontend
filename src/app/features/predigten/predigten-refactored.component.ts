import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsPageBaseComponent } from '../../shared/components/cms-page-base.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { DynamicLayoutComponent } from '../../shared/components/dynamic-layout/dynamic-layout.component';

@Component({
  selector: 'app-predigten',
  standalone: true,
  imports: [
    CommonModule,
    LoadingStateComponent,
    ErrorStateComponent,
    DynamicLayoutComponent,
  ],
  templateUrl: './predigten.component.html',
})
export class PredigtenComponent extends CmsPageBaseComponent {
  protected readonly pageSlug = 'predigten';
}
