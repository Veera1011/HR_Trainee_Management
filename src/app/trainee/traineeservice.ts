import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Trainee {
  _id?: string;
  traineeId: string;
  employeeId: string;
  trainingCode: string;
  startDate: Date;
  endDate?: Date;
  status: 'Pending' | 'Ongoing' | 'Completed';
  completionPercentage?: number;
  remarks?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  private baseurl = 'http://localhost:5000/trainees';

  constructor(private http: HttpClient) {}

  createTrainee(trainee: Partial<Trainee>): Observable<any> {
    return this.http.post<any>(this.baseurl, trainee);
  }

  createMultipleTrainees(trainees: Partial<Trainee>[]): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/bulk`, { trainees });
  }

  getAllTrainees(): Observable<{ success: boolean; count: number; data: any[] }> {
    return this.http.get<{ success: boolean; count: number; data: any[] }>(this.baseurl);
  }

  getTraineeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/${id}`);
  }

  getTraineesByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/status/${status}`);
  }

  getDashboardMetrics(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/dashboard`);
  }

  updateTrainee(id: string, trainee: Partial<Trainee>): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/${id}`, trainee);
  }

  deleteTrainee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${id}`);
  }
}