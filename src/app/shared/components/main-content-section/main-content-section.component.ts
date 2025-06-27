import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSingletonData } from '../../../core/interfaces/page.interface';
import { BaseService } from '../../../core/services/base.service';

@Component({
  selector: 'app-main-content-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-6">
              {{ title }}
            </h2>
            <p class="text-xl text-gray-700 leading-relaxed">
              {{ welcomeText }}
            </p>
          </div>

          <!-- Two Column Layout -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Left Column - Stage Image -->
            <div class="relative overflow-hidden rounded-lg shadow-xl">
              <img
                *ngIf="content.stageImage"
                [src]="getFullImagePath(content.stageImage.path)"
                [alt]="content.stageImage.title || title"
                class="w-full h-full object-cover"
              />
              <!-- Fallback if no stage image -->
              <div
                *ngIf="!content.stageImage"
                class="bg-orange-100 h-64 flex items-center justify-center"
              >
                <div class="text-center text-orange-500 p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>Friedenskirche</p>
                </div>
              </div>
            </div>

            <!-- Right Column - Content -->
            <div class="flex flex-col justify-center">
              <h3 class="text-2xl font-semibold text-gray-800 mb-6">
                Willkommen in unserer Gemeinde
              </h3>
              <div class="prose prose-lg">
                <p class="mb-4">
                  Wir sind eine lebendige Gemeinschaft, die gemeinsam ihren
                  Glauben lebt und feiert. Bei uns findest du Menschen jeden
                  Alters und aus verschiedenen Hintergründen, vereint durch den
                  Glauben an Jesus Christus.
                </p>
                <p class="mb-4">
                  Unsere Gottesdienste, Hauskreise, Kinder- und Jugendarbeit sowie
                  verschiedene Veranstaltungen bieten vielfältige Möglichkeiten,
                  Gemeinschaft zu erleben und den Glauben zu vertiefen.
                </p>
                <p>
                  Wir laden dich herzlich ein, Teil unserer Gemeinde zu werden und
                  gemeinsam mit uns den Weg des Glaubens zu gehen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class MainContentSectionComponent {
  @Input() title!: string;
  @Input() content!: PageSingletonData;
  @Input() welcomeText: string = 'Willkommen in unserer lebendigen Gemeinde! Hier findest du Menschen jeden Alters, die gemeinsam ihren Glauben leben und feiern.';
  
  private baseService = inject(BaseService);
  
  getFullImagePath(path: string): string {
    return `${this.baseService.getBaseImagePathUrl()}${path}`;
  }
}
