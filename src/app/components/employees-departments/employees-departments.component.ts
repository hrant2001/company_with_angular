import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/interfaces/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employees-departments',
  templateUrl: './employees-departments.component.html',
  styleUrls: ['./employees-departments.component.css']
})
export class EmployeesDepartmentsComponent implements OnInit {

  public employees: Employee[];

  constructor(private employeeService: EmployeeService) { 
    this.employees = [];
  }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response.sort((e1, e2) => e1.position.positionId - e2.position.positionId);
        console.log("sorted by posId", this.employees);
        // this.dataSource = new MatTableDataSource(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
