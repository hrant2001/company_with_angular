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
    //.set('Access-Control-Allow-Origin', '*')
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employees`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public getEmployeeById(id: number) : Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServerUrl}/employees/find/${id}`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public addEmployee(employee: Employee) : Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employees/add`, employee, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public updateEmployee(employee: Employee) : Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employees/update`, employee, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public deleteEmployee(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employees/delete/${id}`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public getPositions() : Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiServerUrl}/positions`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public getDepartments() : Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiServerUrl}/departments`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }
}
