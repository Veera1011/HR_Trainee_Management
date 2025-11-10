// app-routing-module.ts
import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './auth/auth-guard';
import { Home } from './home/home';
import { OauthCallback } from './auth/oauth-callback/oauth-callback';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'auth/callback', component: OauthCallback },
  { 
    path: 'traineem', 
    canActivate: [authGuard], 
    loadChildren: () => import('./trainee/trainee-module').then(m => m.TraineeModule) 
  },
  { 
    path: 'manage', 
    canActivate: [authGuard], 
    loadChildren: () => import('./manage/manage-module').then(m => m.ManageModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })],
  exports: [RouterModule]
})
export class AppRoutingModule { }