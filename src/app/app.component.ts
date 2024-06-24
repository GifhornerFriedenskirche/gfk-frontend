import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigationComponent } from './core/components/header-navigation/header-navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    HeaderNavigationComponent,
    HttpClientModule,
    HomeComponent,
  ],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log('');
  }
}
