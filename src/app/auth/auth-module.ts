import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Register } from './register/register';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TraineeModule } from '../trainee/trainee-module';
import { authGuard } from './auth-guard';
import { OauthCallback } from './oauth-callback/oauth-callback';



@NgModule({
  declarations: [
    Login,
    Register,
    OauthCallback
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  
  ],
  exports:[Login,Register],
  providers:[
    provideHttpClient(),
   
  ]
})
export class AuthModule { }
