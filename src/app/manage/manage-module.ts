// manage/manage.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeListComponent } from './employee-list-component/employee-list-component';
import { TrainingListComponent } from './training-list-component/training-list-component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'trainings', component: TrainingListComponent }
];

@NgModule({
  declarations: [
    EmployeeListComponent,
    TrainingListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    provideHttpClient()
  ]
})
export class ManageModule { }