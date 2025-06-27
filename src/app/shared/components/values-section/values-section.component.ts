import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-values-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-orange-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ title }}</h2>
          <p class="text-xl text-gray-700 max-w-3xl mx-auto">
            {{ description }}
          </p>
        </div>

        <!-- Values Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div 
            *ngFor="let value of values" 
            class="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="text-orange-500 mb-4" [innerHTML]="value.icon"></div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900">{{ value.title }}</h3>
            <p class="text-gray-700">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ValuesSectionComponent {
  @Input() title: string = 'Unsere Werte';
  @Input() description: string = 'Diese Kernwerte prägen unsere Gemeinde und begleiten uns in unserem gemeinsamen Glaubensleben.';
  @Input() values: ValueItem[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
             </svg>`,
      title: 'Gemeinschaft',
      description: 'Wir leben Gemeinschaft und unterstützen einander im Alltag und im Glauben.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
             </svg>`,
      title: 'Bibelorientiert',
      description: 'Die Bibel ist unsere Grundlage für den Glauben und das tägliche Leben als Christen.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>`,
      title: 'Nächstenliebe',
      description: 'Wir setzen uns für andere ein und teilen die Liebe Gottes in Wort und Tat.'
    }
  ];
}
