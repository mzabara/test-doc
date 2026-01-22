import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'viewer/view/1',
  },
  {
    path: 'viewer',
    loadChildren: () => import('@pages/viewer/routes').then(r => r.VIEWER_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'viewer/view/1',
  },
];
