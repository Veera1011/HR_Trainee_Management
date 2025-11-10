import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AuthModule } from './auth/auth-module';

import { Home } from './home/home';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth-interceptor';




@NgModule({
  declarations: [
    App,
    Home,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
   
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([authInterceptor])  
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
