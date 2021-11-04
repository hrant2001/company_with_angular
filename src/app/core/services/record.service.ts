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
    return this.http.get<Record[]>(`${this.apiServerUrl}/records`);
  }

  public getRecordById(id: number): Observable<Record> {
    return this.http.get<Record>(`${this.apiServerUrl}/records/${id}`);
  }

  public addRecord(employee: Record): Observable<Record> {
    return this.http.post<Record>(`${this.apiServerUrl}/records`, employee);
  }

  public updateRecord(employee: Record): Observable<Record> {
    return this.http.put<Record>(`${this.apiServerUrl}/records`, employee);
  }

  public deleteRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/records/${id}`);
  }

  public getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiServerUrl}/positions`);
  }

  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiServerUrl}/departments`);
  }

  public getRecordsByCriteria(isEmp: boolean, empOrDep: string, day: string): Observable<Record[]> { //provide correct parametrs
    var searchPath = `/find-by-criteria?is_employee=${isEmp}`;
    if (empOrDep) {
      searchPath += `&criteria=${empOrDep}`
    }
    if (day) {
      searchPath += `&date=${day}`
    }
    return this.http.get<Record[]>(`${this.apiServerUrl}/records` + searchPath);
  }
}