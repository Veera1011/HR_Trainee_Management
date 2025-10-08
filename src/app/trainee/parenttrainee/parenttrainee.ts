import { Component } from '@angular/core';

@Component({
  selector: 'app-parenttrainee',
  standalone: false,
  templateUrl: './parenttrainee.html',
  styleUrl: './parenttrainee.scss'
})
export class Parenttrainee {

  trainings=['Angular', 'Node js', 'Express js', 'MongoDB']
  status=['Pending','Ongoing','Completed']
  childres=''

  traineeform(response:any){
    
    alert('Message from Child Component' + ' ' + `${response.message}`);
    this.childres= `${response.message}`
  }

}
