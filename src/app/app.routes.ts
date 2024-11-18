import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HeaderNavigationComponent } from './core/components/header-navigation/header-navigation.component';
import { UnsereGemeindeComponent } from './features/unsere-gemeinde/unsere-gemeinde.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Standardroute
  { path: 'startseite', component: HomeComponent }, // Standardroute
  { path: 'unsere-gemeinde', component: UnsereGemeindeComponent },
  { path: 'header', component: HeaderNavigationComponent },
  // Weitere Routen hinzufügen
];
