import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,filter,map } from 'rxjs';

export interface Trainee{
  _id?:any,
  EmployeeName:string,
  TrainingName:string,
  StartDate:Date,
  EndDate?:Date,
  Status:string
}

@Injectable({
  providedIn: 'root'
})
export class Traineeservice {

  baseurl='http://localhost:5000/trainees';

  constructor(private http:HttpClient){}


addTrainee(trainee:Trainee):Observable<Trainee>{

  return this.http.post<Trainee>(`${this.baseurl}`,trainee);
}

getTrainees(): Observable<Trainee[]> {
  return this.http.get<{data: Trainee[] }>(this.baseurl)
    .pipe(
      map(response => response.data),
      
    );
}

deletebyname(name:string):Observable<any>{

  return this.http.delete<any>(`${this.baseurl}/name/${name}`);
}

updateTrainee(id: string, trainee: Trainee): Observable<Trainee> {
  return this.http.put<Trainee>(`${this.baseurl}/${id}`, trainee);
}


  
  
}




























// getTrainees(): Observable<Trainee[]> {
//   return this.http.get<{ success: boolean; count: number; data: Trainee[] }>(this.baseurl)
//     .pipe(
//       map(response => response.data),
      
//     ).pipe(map((a:any)=>a.sort((a:any,b:any)=>b.Status.localeCompare(a.Status))));
// }

