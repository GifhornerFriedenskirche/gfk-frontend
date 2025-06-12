import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage-content.component.html',
  styleUrl: './homepage-content.component.scss',
})
export class HomepageContentComponent {
  // Static content component - will be connected to API later
}
