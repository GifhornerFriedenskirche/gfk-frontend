import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <!-- Section Title -->
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Was uns wichtig ist
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Entdecke, was unsere Gemeinde ausmacht und wie du Teil unserer
            Gemeinschaft werden kannst.
          </p>
        </div>

        <!-- Content Cards Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <!-- Card 1: hüpfen & dazugehören -->
          <div
            class="card shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group cursor-pointer transform hover:-translate-y-2"
            style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);"
          >
            <!-- Badge Number - Centered -->
            <div
              class="absolute -top-3 -left-3 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-lg"
            >
              1
            </div>

            <!-- Image -->
            <figure class="relative overflow-hidden">
              <img
                src="https://via.placeholder.com/400x200/f39c12/ffffff?text=Kinder+Event"
                alt="Kinder Event"
                class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </figure>

            <!-- Card Body -->
            <div class="card-body p-6 text-white">
              <h3 class="card-title text-2xl font-bold mb-4 text-white">
                hüpfen & dazugehören
              </h3>

              <p class="text-base leading-relaxed text-white opacity-90">
                Wir wünschen allen eine schöne Sommerzeit! - Nächster Termin:
                17. August
              </p>

              <!-- Action Button -->
              <div class="card-actions justify-end mt-6">
                <button
                  class="btn bg-white text-orange-500 hover:bg-orange-50 border-white hover:border-orange-100 transition-all duration-300 hover:scale-105"
                >
                  Mehr erfahren
                </button>
              </div>
            </div>
          </div>

          <!-- Card 2: taufen -->
          <div
            class="card shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden bg-white border border-gray-200 group cursor-pointer transform hover:-translate-y-2"
          >
            <!-- Badge Number - Centered -->
            <div
              class="absolute -top-3 -left-3 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-lg"
            >
              2
            </div>

            <!-- Image -->
            <figure class="relative overflow-hidden">
              <img
                src="https://via.placeholder.com/400x200/4a90e2/ffffff?text=Taufe+am+See"
                alt="Taufe am See"
                class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </figure>

            <!-- Card Body -->
            <div class="card-body p-6">
              <h3 class="card-title text-2xl font-bold mb-4 text-gray-800">
                taufen
              </h3>

              <p class="text-base leading-relaxed text-gray-600">
                Taufe am 15. Juni Tankumsee (beim DLRG Turm)
              </p>

              <!-- Action Button -->
              <div class="card-actions justify-end mt-6">
                <button
                  class="btn bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600 transition-all duration-300 hover:scale-105"
                >
                  Mehr erfahren
                </button>
              </div>
            </div>
          </div>

          <!-- Card 3: feiern -->
          <div
            class="card shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group cursor-pointer transform hover:-translate-y-2"
            style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);"
          >
            <!-- Badge Number - Centered -->
            <div
              class="absolute -top-3 -left-3 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-lg"
            >
              3
            </div>

            <!-- Jubilee Image/Icon -->
            <figure
              class="relative overflow-hidden bg-orange-400 h-48 flex items-center justify-center"
            >
              <div
                class="text-6xl text-white font-bold transition-transform duration-300 group-hover:scale-110"
              >
                60
              </div>
              <div class="absolute bottom-2 right-2 text-white text-sm">
                Jahre<br />1965-2025
              </div>
            </figure>

            <!-- Card Body -->
            <div class="card-body p-6 text-white">
              <h3 class="card-title text-2xl font-bold mb-4 text-white">
                feiern
              </h3>

              <p class="text-base leading-relaxed text-white opacity-90">
                Jubiläum September 2025 - Plane deinen Besuch!<br />
                <small>05.09. - 07.09.2025</small>
              </p>

              <!-- Action Button -->
              <div class="card-actions justify-end mt-6">
                <button
                  class="btn bg-white text-orange-500 hover:bg-orange-50 border-white hover:border-orange-100 transition-all duration-300 hover:scale-105"
                >
                  Mehr erfahren
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .card {
        border-radius: 1rem;
      }

      /* Cool hover effects */
      .group:hover .card-title {
        transform: translateY(-2px);
      }

      .group:hover {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
    `,
  ],
})
export class HomepageContentComponent {}
