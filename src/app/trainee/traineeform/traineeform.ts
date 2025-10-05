import { Component, OnInit } from '@angular/core';
import { Traineeservice } from '../traineeservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-traineeform',
  standalone: false,
  templateUrl: './traineeform.html',
  styleUrl: './traineeform.scss'
})
export class Traineeform implements OnInit {

  traineeform!:FormGroup;
  responsemessage:any='';
  trainings=['Angular', 'Node js', 'Express js', 'MongoDB']


  constructor(private traineeservice:Traineeservice,private fb:FormBuilder){}

  ngOnInit(): void {
      this.traineeform=this.fb.group({
        EmployeeName:['',[Validators.required]],
        TrainingName:['',[Validators.required]],
        StartDate:['',[Validators.required]],
        EndDate:[''],
        Status:['',[Validators.required]]

      });
  }

addTrainee(){
  if(this.traineeform.valid){
    const formData = {
      ...this.traineeform.value,
      StartDate: new Date(this.traineeform.value.StartDate),
      EndDate: this.traineeform.value.EndDate ? new Date(this.traineeform.value.EndDate) : null
    };
    
    this.traineeservice.addTrainee(formData).subscribe({
      next:(response)=>{
        this.responsemessage=response;
        alert(JSON.stringify(this.responsemessage.message))
        this.traineeform.reset();
      },
      error:(error)=>{console.error(error)}
    })
  }
}



}
