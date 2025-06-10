import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigationComponent } from './core/components/header-navigation/header-navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HeaderNavigationComponent],
})
export class AppComponent {}
