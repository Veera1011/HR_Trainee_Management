import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  _id?: string;
  employeeId: string;
  employeeName: string;
  email: string;
  department?: string;
  designation?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseurl = 'http://localhost:5000/employees';

  constructor(private http: HttpClient) {}

  createEmployee(employee: Partial<Employee>): Observable<any> {
    return this.http.post<any>(this.baseurl, employee);
  }

  getAllEmployees(): Observable<{ success: boolean; count: number; data: Employee[] }> {
    return this.http.get<{ success: boolean; count: number; data: Employee[] }>(this.baseurl);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/${id}`);
  }

  updateEmployee(id: string, employee: Partial<Employee>): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/${id}`);
  }
}