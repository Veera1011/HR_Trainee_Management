import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Trainee {
  _id?: string;
  traineeId?: string;
  employeeId: string;
  trainingCode: string;
  startDate: Date | string;
  endDate?: Date | string;
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

  // Get all trainees - returns the data array directly
  getTrainees(): Observable<any[]> {
    return this.http.get<{ success: boolean; count: number; data: any[] }>(this.baseurl)
      .pipe(map(response => response.data));
  }

  getAllTrainees(): Observable<{ success: boolean; count: number; data: any[] }> {
    return this.http.get<{ success: boolean; count: number; data: any[] }>(this.baseurl);
  }

  getTraineeById(traineeId: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/${traineeId}`);
  }

  getTraineesByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/status/${status}`);
  }

  getDashboardMetrics(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/dashboard`);
  }

  updateTrainee(traineeId: string, trainee: Partial<Trainee>): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/${traineeId}`, trainee);
  }

  deleteTrainee(traineeId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${traineeId}`);
  }

  // Helper method to delete by finding trainee first
  deleteByName(name: string): Observable<any> {
    return this.getTrainees().pipe(
      map(trainees => {
        const trainee = trainees.find((t: any) => 
          t.employeeId?.employeeName === name
        );
        if (!trainee) {
          throw new Error('Trainee not found');
        }
        return trainee.traineeId;
      }),
      map(traineeId => this.deleteTrainee(traineeId))
    );
  }
}