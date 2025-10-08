import { Pipe, PipeTransform } from '@angular/core';
import { Trainee } from './traineeservice';

@Pipe({
  name: 'statuspipe',
  standalone: false
})
export class StatuspipePipe implements PipeTransform {

  transform(trainees:Trainee[],status:string):number {


    if(status){
      const data=trainees.filter((a:any)=>a.Status===`${status}`).length
      return data;
    }
return 0;

    
  }

}
