import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Position } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../interfaces/department';
import { Record } from '../interfaces/record';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(`${this.apiServerUrl}/records`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public getRecordById(id: number): Observable<Record> {
    return this.http.get<Record>(`${this.apiServerUrl}/records/find/${id}`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public addRecord(employee: Record): Observable<Record> {
    return this.http.post<Record>(`${this.apiServerUrl}/records/add`, employee, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public updateRecord(employee: Record): Observable<Record> {
    return this.http.put<Record>(`${this.apiServerUrl}/records/update`, employee, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public deleteRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/records/delete/${id}`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiServerUrl}/positions`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiServerUrl}/departments`, {headers: new HttpHeaders().set(`Authorization`, `Bearer_${sessionStorage.getItem('token')}`)});
  }

  // public getRecordsByCriteria(from: string, to: string, empOrDep: string, isEmp: boolean): Observable<Record[]> { //provice correct parametrs
  //   if (!from) {
  //     from = "null";
  //   }
  //   if (!to) {
  //     to = "null";
  //   }
  //   if (!empOrDep) {
  //     empOrDep = "null";
  //   }
  //   console.log("In service", from, to);
  //     return this.http.get<Record[]>(`${this.apiServerUrl}/records/by_criteria/${from}/${to}/${empOrDep}/${isEmp}`);
  // }
}