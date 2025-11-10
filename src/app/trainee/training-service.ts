import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Training {
  _id?: string;
  trainingCode: string;
  trainingName: string;
  stack: 'MEAN' | 'SAP' | 'CBP' | 'Functional';
  duration?: number;
  description?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseurl = 'http://localhost:5000/trainings';

  constructor(private http: HttpClient) {}

  createTraining(training: Partial<Training>): Observable<any> {
    return this.http.post<any>(this.baseurl, training);
  }

  seedTrainings(): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/seed`, {});
  }

  getAllTrainings(): Observable<{ success: boolean; count: number; data: Training[] }> {
    return this.http.get<{ success: boolean; count: number; data: Training[] }>(this.baseurl);
  }

  getTrainingsByStack(stack: string): Observable<{ success: boolean; count: number; data: Training[] }> {
    return this.http.get<{ success: boolean; count: number; data: Training[] }>(`${this.baseurl}/stack/${stack}`);
  }

  updateTraining(code: string, training: Partial<Training>): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/${code}`, training);
  }

  deleteTraining(code: string): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${code}`);
  }
}