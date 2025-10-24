import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parenttrainee',
  standalone: false,
  templateUrl: './parenttrainee.html',
  styleUrl: './parenttrainee.scss'
})
export class Parenttrainee {

  trainings = ['Angular', 'Node js', 'Express js', 'MongoDB']
  status = ['Pending', 'Ongoing', 'Completed']
  childres = ''

  traineeform(response: any) {

    Swal.fire({
      title: 'Added',
      text: 'Message from Child Component' + ' ' + `${response.message}`,
      icon: 'success',
      theme: 'material-ui-light',
    })


    this.childres = `${response.message}`
  }

}
