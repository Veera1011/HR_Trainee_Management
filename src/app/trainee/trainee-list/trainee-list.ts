import { Component, OnInit } from '@angular/core';
import { Traineeservice, Trainee } from '../traineeservice';

@Component({
  selector: 'app-trainee-list',
  standalone: false,
  templateUrl: './trainee-list.html',
  styleUrl: './trainee-list.scss'
})
export class TraineeList implements OnInit {
  trainees: Trainee[] = [];
  response:any='';


  constructor(private traineeservice: Traineeservice) {}

  ngOnInit(): void {
    this.loadTrainees();
  }

  loadTrainees() {
    this.traineeservice.getTrainees().pipe().subscribe({
      next: (data) => this.trainees = data,
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
