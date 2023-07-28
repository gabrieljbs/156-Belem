import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),

  },
  {
    path: 'location',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'anexo',
    loadChildren: () => import('./pages/ticket/ticket.module').then( m => m.TicketPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'solicitation',
    loadChildren: () => import('./pages/solicitation/solicitation.module').then( m => m.SolicitationPageModule)
  },
  {
    path: 'places',
    loadChildren: () => import('./pages/places/places.module').then( m => m.PlacesPageModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./pages/ticket/ticket.module').then( m => m.TicketPageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  },
  {
    path: 'tourism',
    loadChildren: () => import('./pages/tourism/tourism.module').then( m => m.TourismPageModule)
  },
  {
    path: 'new-solicitation',
    loadChildren: () => import('./pages/new-solicitation/new-solicitation.module').then( m => m.NewSolicitationPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
