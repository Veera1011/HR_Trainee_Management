import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Traineeform } from './trainee/traineeform/traineeform';
import { authGuard } from './auth/auth-guard';
import { Home } from './home/home';
import { TraineeList } from './trainee/trainee-list/trainee-list';
import { EditTrainee } from './trainee/edit-trainee/edit-trainee';

const routes: Routes = [
  {path:'',component:Home},
  {path:'login',component:Login},
  {path:'register',component:Register},
  {path:'trainee',component:Traineeform,canActivate:[authGuard]},
  {path:'traineelist',component:TraineeList,canActivate:[authGuard]},
   {path:'edit/:id',component:EditTrainee,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
