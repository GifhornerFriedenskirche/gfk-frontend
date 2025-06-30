import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsPageBaseComponent } from '../../shared/components/cms-page-base.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { DynamicLayoutComponent } from '../../shared/components/dynamic-layout/dynamic-layout.component';

@Component({
  selector: 'app-unsere-gemeinde',
  standalone: true,
  imports: [
    CommonModule,
    LoadingStateComponent,
    ErrorStateComponent,
    DynamicLayoutComponent,
  ],
  templateUrl: './unsere-gemeinde.component.html',
})
export class UnsereGemeindeComponent extends CmsPageBaseComponent {
  protected readonly pageSlug = 'unsere-gemeinde';
}
