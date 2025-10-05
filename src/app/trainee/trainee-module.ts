import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Traineeform } from './traineeform/traineeform';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TraineeList } from './trainee-list/trainee-list';
import { EditTrainee } from './edit-trainee/edit-trainee';
import { RouterLink } from '@angular/router';




@NgModule({
  declarations: [
    Traineeform,
    TraineeList,
    EditTrainee
 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePipe,
    RouterLink
  ],
  providers:[
    provideHttpClient()
  ],
  exports:[Traineeform,TraineeList,EditTrainee]
})
export class TraineeModule { }
