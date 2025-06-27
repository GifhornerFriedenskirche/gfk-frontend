import { Routes } from '@angular/router';

export const PREDIGTEN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./predigten.component').then((m) => m.PredigtenComponent),
    data: { breadcrumb: 'Predigten' },
  },
];
