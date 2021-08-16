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
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  public dataSource: any;

  constructor(private employeeService: EmployeeService) {
    this.employees = [];
    this.editEmployee = {} as Employee;
    this.deleteEmployee = {} as Employee;
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

  // public onAddEmloyee(addForm: NgForm): void {
  //   document.getElementById('add-employee-form').click();
  //   this.employeeService.addEmployee(addForm.value).subscribe(
  //     (response: Employee) => {
  //       console.log(response);
  //       this.getEmployees();
  //       addForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  // }

  // public onUpdateEmloyee(employee: Employee): void {
  //   this.employeeService.updateEmployee(employee).subscribe(
  //     (response: Employee) => {
  //       console.log(response);
  //       this.getEmployees();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // public onDeleteEmloyee(employeeId: number): void {
  //   this.employeeService.deleteEmployee(employeeId).subscribe(
  //     (response: void) => {
  //       console.log(response);
  //       this.getEmployees();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // public onOpenModal(employee: Employee, mode: string): void {
  //   const container = document.getElementById('emp-table');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
  //   if (mode === 'add') {
  //     button.setAttribute('data-target', '#addEmployeeModal');
  //   }
  //   if (mode === 'edit') {
  //     this.editEmployee = employee;
  //     button.setAttribute('data-target', '#updateEmployeeModal');
  //   }
  //   if (mode === 'delete') {
  //     this.deleteEmployee = employee;
  //     button.setAttribute('data-target', '#deleteEmployeeModal');
  //   }
  //   container.appendChild(button);
  //   button.click();
  // }

}
