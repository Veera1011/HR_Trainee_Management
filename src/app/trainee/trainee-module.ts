import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TraineeList } from './trainee-list/trainee-list';
import { EditTrainee } from './edit-trainee/edit-trainee';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { Parenttrainee } from './parenttrainee/parenttrainee';
import { Status } from './status';
import { StatuspipePipe } from './statuspipe-pipe';
import { MultiTraineeForm } from './multi-trainee-form/multi-trainee-form';


const routes:Routes=[
   {path:'',component:MultiTraineeForm},
    {path:'traineelist',component:TraineeList},
     {path:'edit/:id',component:EditTrainee}
]


@NgModule({
  declarations: [
    MultiTraineeForm,
    TraineeList,
    EditTrainee,
    Parenttrainee,
    Status,
    StatuspipePipe,
    MultiTraineeForm
 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    RouterLink,
    RouterModule.forChild(routes)
    
  ],
  providers:[
    provideHttpClient()
  ],
  exports:[MultiTraineeForm,TraineeList,EditTrainee,Parenttrainee]
})
export class TraineeModule { }
