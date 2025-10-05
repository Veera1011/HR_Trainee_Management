import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Register } from './register/register';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TraineeModule } from '../trainee/trainee-module';
import { authGuard } from './auth-guard';



@NgModule({
  declarations: [
    Login,
    Register
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TraineeModule
  ],
  exports:[Login,Register],
  providers:[
    provideHttpClient(),
   
  ]
})
export class AuthModule { }
