import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/interfaces/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employees-tabs',
  templateUrl: './employees-tabs.component.html',
  styleUrls: ['./employees-tabs.component.css']
})
export class EmployeesTabsComponent implements OnInit {

  public employees: Employee[] = [];
  public employeesByDep: Employee[] = [];
  
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employeeService.employees = response;
        this.employees = this.employeeService.employees;
        this.employeesByDep = [...this.employees].sort((e1, e2) => e1.position.positionId - e2.position.positionId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
