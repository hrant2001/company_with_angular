import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../core/interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  public displayedColumns: string[] = ["employeeNumber", "fname", "lname", "birthday", "email", "position", "department", "actions"];
  public employees: Employee[];

  public dataSource: any;

  constructor(private employeeService: EmployeeService) {
    this.employees = [];

  }

  ngOnInit() {
    this.getEmployees();

  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.dataSource = new MatTableDataSource(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
