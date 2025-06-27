import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
      ></div>
    </div>
  `,
})
export class LoadingStateComponent {}
