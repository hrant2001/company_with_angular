import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
import { environment } from 'src/environments/environment';
import { Position } from '../interfaces/position';
import { Department } from '../interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;

  public employees: Employee[] = [];
  
  constructor(private http: HttpClient) { }
  
  public getEmployees() : Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employees`);
  }

  public getEmployeeById(id: number) : Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServerUrl}/employees/find/${id}`);
  }

  public addEmployee(employee: Employee) : Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employees/add`, employee);
  }

  public updateEmployee(employee: Employee) : Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employees/update`, employee);
  }

  public deleteEmployee(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employees/delete/${id}`);
  }

  public getPositions() : Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiServerUrl}/positions`);
  }

  public getDepartments() : Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiServerUrl}/departments`);
  }
}
