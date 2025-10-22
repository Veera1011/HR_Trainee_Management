import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Traineeservice, Trainee } from '../traineeservice';
import {  map } from 'rxjs';


@Component({
  selector: 'app-trainee-list',
  standalone: false,
  templateUrl: './trainee-list.html',
  styleUrl: './trainee-list.scss'
})
export class TraineeList implements OnInit,AfterViewInit {
@ViewChild('searchname') searchInput!: ElementRef;
@ViewChild('but1')  date1!:ElementRef;
@ViewChild('but2')  date2!:ElementRef;
  trainees: Trainee[] = [];
  response:any='';
  name:string=''
  sd:Date |null=null;
  ed:Date |null=null;
  sdRequired=false;
  edRequired=false;

//  dup: { [key: string]: { train: string[], count: number } } = {};



  constructor(private traineeservice: Traineeservice) {}

  ngOnInit(): void {
    this.loadTrainees();
   
    
  }
  ngAfterViewInit(): void {
      this.searchInput.nativeElement.focus();
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

  filter(){
    if(this.name){
      this.traineeservice.getTrainees().pipe(map((a:any)=>a.filter((a:any)=>a.EmployeeName.toLowerCase()===this.name.toLowerCase()))).subscribe({
      next: (data) =>{ this.trainees = data;
        
      },
      error: (err) => console.error(err)
    });

    }
    else{
      this.loadTrainees()
    }

    
     
    
  }
  
filterbydate(){
  this.sdRequired = false;
    this.edRequired = false;
    this.date1.nativeElement.style.border = '';
    this.date2.nativeElement.style.border = '';
  if (!this.sd) {
      this.sdRequired = true;
      this.date1.nativeElement.style.border = '1px solid red';
    } 
     if (!this.ed) {
      this.edRequired = true;
      this.date2.nativeElement.style.border = '1px solid red';
    } 
  if(this.sd && this.ed){
    const sd=new Date(this.sd);
    const ed=new Date(this.ed);
      this.traineeservice.getTrainees().pipe(map((a:any)=>a.filter((a:any)=>{
        const startdate=new Date(a.StartDate);
        return startdate >= sd && startdate <=ed;
      }))).subscribe({
      next: (data) =>{ this.trainees = data;
        
      },
      error: (err) => console.error(err)
    });

    }
    else{
      this.loadTrainees()
    }
}

clear(){
  this.sd=null;
  this.ed=null;
  this.searchInput.nativeElement.value = '';
  this.searchInput.nativeElement.focus();
  this.loadTrainees();
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