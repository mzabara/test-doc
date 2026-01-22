import { Routes } from '@angular/router';
import { Viewer } from '@pages/viewer/viewer';

export const VIEWER_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'view/1',
  },
  {
    path: 'view/:id',
    component: Viewer,
  }
];
