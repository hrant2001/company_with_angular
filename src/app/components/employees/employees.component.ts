import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../core/interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  public displayedColumns: string[] = ["employeeNumber", "fname", "lname", "birthday", "email", "position", "department", "actions"];
  public employees: Employee[];

  public dataSource: any;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
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

  public deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.getEmployees();
    });
  }

  public addEditEmployee(selectedEmployee?: Employee): void {
    console.log(selectedEmployee);
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: '610px',
      height: '500px',
      data: selectedEmployee ? selectedEmployee : {employeeId:0, fname:"", lname:"", birthday:"", email:"", positionId:0, positionName:"", departmentId:0, departmentName:""} 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        if (result.employeeId) {
          this.employeeService.updateEmployee(result).subscribe(
            (response: Employee) => {
              console.log("Updated successfully",response);
              this.getEmployees();
            }
          );
        }
        else {
          this.employeeService.addEmployee(result).subscribe(
            (response: Employee) => {
              console.log("Added successfully",response);
              this.getEmployees();
            }
          );
        }
      }

    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
