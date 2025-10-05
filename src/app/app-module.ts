import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AuthModule } from './auth/auth-module';
import { TraineeModule } from './trainee/trainee-module';
import { Home } from './home/home';


@NgModule({
  declarations: [
    App,
    Home,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    TraineeModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
