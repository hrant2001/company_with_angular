import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../core/interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  public displayedColumns: string[] = ["employeeNumber", "fname", "lname", "birthday", "email", "position", "department", "actions"];
  public employees: Employee[];
  public filter: string;

  public dataSource: any;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
    this.employees = [];
    this.filter = '';
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

  public deleteEmployee(emp: Employee): void {
    const selectedEmployee = {...emp};
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '610px',
      height: '200px',
      data: selectedEmployee
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog was closed', result);
      if (result) {
        this.employeeService.deleteEmployee(emp.employeeId).subscribe(() => {
          console.log("Deleted successfully");
          this.getEmployees();
        }
        );
      }
    });
  }

  public addEditEmployee(selectedEmployee?: Employee): void {
    console.log(selectedEmployee);
    const emp = { ...selectedEmployee };
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: '650px',
      height: '400px',
      data: selectedEmployee ? emp : { employeeId: 0, fname: "", lname: "", birthday: "", email: "", positionId: 0, positionName: "", departmentId: 0, departmentName: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit add dialog was closed', result);
      if (result) {
        if (1) { //change !result.hasError('required')??
          if (result.employeeId) {
            this.employeeService.updateEmployee(result).subscribe(
              (response: Employee) => {
                console.log("Updated successfully", response);
                this.getEmployees();
              }
            );
          }
          else {
            this.employeeService.addEmployee(result).subscribe(
              (response: Employee) => {
                console.log("Added successfully", response);
                this.getEmployees();
              }
            );
          }
        }
      }
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public resetFilter() {
    this.dataSource.filter = '';
    this.filter = '';
  }
}
