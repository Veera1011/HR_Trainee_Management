import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Traineeservice } from '../traineeservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-traineeform',
  standalone: false,
  templateUrl: './traineeform.html',
  styleUrl: './traineeform.scss'
})
export class Traineeform implements OnInit,OnChanges,AfterViewInit,AfterViewChecked,AfterContentInit,AfterContentChecked,OnDestroy {

  traineeform!:FormGroup;
  responsemessage:any='';
  @Input() trainings:string[]=[];
  @Input() status:string[]=[];
  @Output() formsubmit= new EventEmitter<any>();
  private subscribers=new Subscription();


  constructor(private traineeservice:Traineeservice,private fb:FormBuilder){}

  ngOnChanges(changes: SimpleChanges): void {
      console.log('input property changed'+ ' ' +JSON.stringify(changes));
      
  }

  ngOnInit(): void {
      this.traineeform=this.fb.group({
        EmployeeName:['',[Validators.required]],
        TrainingName:['',[Validators.required]],
        StartDate:['',[Validators.required]],
        EndDate:[''],
        Status:['',[Validators.required]]

      });
  }
ngAfterContentInit(): void {
    console.log('external content from parent is rendered')
}

ngAfterContentChecked(): void {
    console.log('the external content is changed');
    
}

ngAfterViewInit(): void {
    console.log('after trainee form template is rendered')
}

ngAfterViewChecked(): void {
    console.log('checking any update in traineeform template')
}

addTrainee(){
  if(this.traineeform.valid){
    const formData = {
      ...this.traineeform.value,
      StartDate: new Date(this.traineeform.value.StartDate),
      EndDate: this.traineeform.value.EndDate ? new Date(this.traineeform.value.EndDate) : null
    };
    

    Swal.fire({
      title:'Add the Trainee',
      text:'Do You want to add?',
      showCancelButton:true,
      confirmButtonColor:'green',
      confirmButtonText:'Add',
      reverseButtons:true,
      icon:'question'
    }).then((result)=>{
      if(result.isConfirmed){
        this.subscribers.add(this.traineeservice.addTrainee(formData).subscribe({
      next:(response)=>{
        this.responsemessage=response;
       
        this.traineeform.reset();
         this.formsubmit.emit(response);
      },
      error:(error)=>{console.error(error)}
    }));
      }
    })
   
  }
}

ngOnDestroy(): void {
    this.subscribers.unsubscribe();
}


}
