import { Component, OnInit } from '@angular/core';
import { Traineeservice, Trainee } from '../traineeservice';
import { count } from 'rxjs';

@Component({
  selector: 'app-trainee-list',
  standalone: false,
  templateUrl: './trainee-list.html',
  styleUrl: './trainee-list.scss'
})
export class TraineeList implements OnInit {
  trainees: Trainee[] = [];
  response:any='';

//  dup: { [key: string]: { train: string[], count: number } } = {};



  constructor(private traineeservice: Traineeservice) {}

  ngOnInit(): void {
    this.loadTrainees();
   
    
  }

  loadTrainees() {
    this.traineeservice.getTrainees().pipe().subscribe({
      next: (data) =>{ this.trainees = data;
        
      },
      error: (err) => console.error(err)
    });
  }

  deleteTrainee(name:string){
    this.traineeservice.deletebyname(name).subscribe({
      next:(response) => {
        this.response=response;
        alert(this.response.message);
        this.loadTrainees();
      },
      error:(error) => {console.error(error)}

    })

  }

  



 
}












//  get(){
//     const temp:{[key:string]:Set<string>}={};

//     this.trainees.forEach(e=>{
//       if(!temp[e.EmployeeName]){
//         temp[e.EmployeeName]=new Set();
//       }
//       temp[e.EmployeeName].add(e.TrainingName)
//     });
//     console.log(temp);

//     Object.keys(temp).forEach(s=>{
//       this.dup[s]={
//         train: Array.from(temp[s]),
//         count:temp[s].size
//       }
//     })
    
//   }