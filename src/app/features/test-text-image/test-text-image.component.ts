import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextImageComponent } from '../../shared/components/layout-components/text-image-component/text-image-component.component';
import { LAYOUT_COMPONENT_TYPES } from '../../core/constants/app.constants';
import { PageLayoutComponent } from '../../core/interfaces/page.interface';

@Component({
  selector: 'app-test-text-image',
  standalone: true,
  imports: [CommonModule, TextImageComponent],
  template: `
    <div class="container mx-auto p-4 mb-8">
      <h1 class="text-3xl font-bold mb-8">Text-Image Component Demo</h1>

      <div class="mb-16">
        <!-- Index 0: Standard layout - Image LEFT, Text RIGHT -->
        <div class="mb-8 p-2">
          <h2 class="text-lg font-medium mb-2">
            Component 1 (Index 0: Standard Layout)
          </h2>
          <app-text-image-component [component]="component1" [index]="0">
          </app-text-image-component>
        </div>

        <!-- Index 1: Reversed layout - Text LEFT, Image RIGHT -->
        <div class="mb-8 p-2">
          <h2 class="text-lg font-medium mb-2">
            Component 2 (Index 1: Reversed Layout)
          </h2>
          <app-text-image-component [component]="component2" [index]="1">
          </app-text-image-component>
        </div>

        <!-- Index 2: Standard layout - Image LEFT, Text RIGHT -->
        <div class="mb-8 p-2">
          <h2 class="text-lg font-medium mb-2">
            Component 3 (Index 2: Standard Layout)
          </h2>
          <app-text-image-component [component]="component3" [index]="2">
          </app-text-image-component>
        </div>
      </div>
    </div>
  `,
})
export class TestTextImageComponent {
  // Sample component with image on left, text on right (index 0)
  component1: PageLayoutComponent = {
    id: 'component1',
    component: LAYOUT_COMPONENT_TYPES.TEXT_IMAGE,
    label: 'Text Image Demo 1',
    children: {},
    data: {
      title: 'Hier bin ich gern',
      text: `<p>Schön, dass du da bist! Wir freuen uns, dass du mit uns auf einem gemeinsamen Weg Gott - den Vater, den Sohn Jesus Christus und den Heiligen Geist - erfahren willst.</p>
      <p>Alles in unserer Kirche ist freiwillig. Wie du dich und mit welcher Kraft du dich in unser Germeindeleben einbringst, entscheidest du selbst.</p>`,
      buttonText: 'Lerne uns kennen!',
      buttonLink: '/unsere-gemeinde',
      asset: {
        path: '/non-existent-image-1.jpg',
        title: 'Friedenskirche Gemeinschaft',
        mime: 'image/jpeg',
        type: 'image',
        description: 'Bild der Friedenskirche',
        tags: ['kirche', 'gemeinde'],
        size: 150000,
        colors: ['#ffffff', '#000000'],
        width: 1200,
        height: 800,
        _hash: 'abc123',
        _created: Date.now(),
        _modified: Date.now(),
        _cby: 'admin',
        thumbhash: 'thumb123',
        folder: 'uploads',
        _id: 'img1',
      },
    },
  };

  // Sample component with text on left, image on right (index 1)
  component2: PageLayoutComponent = {
    id: 'component2',
    component: LAYOUT_COMPONENT_TYPES.TEXT_IMAGE,
    label: 'Text Image Demo 2',
    children: {},
    data: {
      title: 'Unsere Angebote',
      text: `<p>In der Friedenskirche sind wir füreinander da und haben dabei auch Menschen unserer Stadt im Blick.</p>
      <p>Wir wünschen uns, dass auch du in der Friedenskirche erfährst: Hier bin ich gern!</p>`,
      buttonText: 'Mehr erfahren',
      buttonLink: '/angebote',
      asset: {
        path: '/non-existent-image-2.jpg',
        title: 'Gemeinsame Aktivitäten',
        mime: 'image/jpeg',
        type: 'image',
        description: 'Bild von Gemeindeaktivitäten',
        tags: ['gemeinschaft', 'aktivitäten'],
        size: 180000,
        colors: ['#f5f5f5', '#333333'],
        width: 1200,
        height: 800,
        _hash: 'def456',
        _created: Date.now(),
        _modified: Date.now(),
        _cby: 'admin',
        thumbhash: 'thumb456',
        folder: 'uploads',
        _id: 'img2',
      },
    },
  };

  // Sample component without button (index 2)
  component3: PageLayoutComponent = {
    id: 'component3',
    component: LAYOUT_COMPONENT_TYPES.TEXT_IMAGE,
    label: 'Text Image Demo 3',
    children: {},
    data: {
      title: 'Gemeinschaft erleben',
      text: `<p>Gerade die Menschen, die nicht immer "schneller, höher, weiter" können, liegen uns besonders auf dem Herzen.</p>
      <p>Unser wunderschönes Kirchengebäude schafft für verschiedene Altersgruppen Räume der Begegnung. Hier fühlen sich Kinder und auch Senioren wohl.</p>`,
      asset: {
        path: '/non-existent-image-3.jpg',
        title: 'Räume der Begegnung',
        mime: 'image/jpeg',
        type: 'image',
        description: 'Begegnungsräume in der Kirche',
        tags: ['räume', 'begegnung', 'kirche'],
        size: 200000,
        colors: ['#e5e5e5', '#222222'],
        width: 1200,
        height: 800,
        _hash: 'ghi789',
        _created: Date.now(),
        _modified: Date.now(),
        _cby: 'admin',
        thumbhash: 'thumb789',
        folder: 'uploads',
        _id: 'img3',
      },
    },
  };
}
