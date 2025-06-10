import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'startseite',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'unsere-gemeinde',
    loadChildren: () =>
      import('./features/unsere-gemeinde/unsere-gemeinde.routes').then(
        (m) => m.unsereGemeindeRoutes
      ),
  },
  // Alternative: If you want to group home routes in the future
  // {
  //   path: 'home',
  //   loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes)
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
