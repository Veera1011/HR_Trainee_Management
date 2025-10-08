import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Traineeform } from './traineeform/traineeform';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TraineeList } from './trainee-list/trainee-list';
import { EditTrainee } from './edit-trainee/edit-trainee';
import { RouterLink } from '@angular/router';
import { Parenttrainee } from './parenttrainee/parenttrainee';
import { Status } from './status';
import { StatuspipePipe } from './statuspipe-pipe';





@NgModule({
  declarations: [
    Traineeform,
    TraineeList,
    EditTrainee,
    Parenttrainee,
    Status,
    StatuspipePipe
 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    RouterLink
  ],
  providers:[
    provideHttpClient()
  ],
  exports:[Traineeform,TraineeList,EditTrainee,Parenttrainee]
})
export class TraineeModule { }
