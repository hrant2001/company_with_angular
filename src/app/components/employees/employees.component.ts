import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
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

export class EmployeesComponent implements OnInit, OnChanges {

  @Input() public employeesChild: Employee[] = [];
  @Output() public refreshEmployees: EventEmitter<any> = new EventEmitter();

  public displayedColumns: string[] = ["employeeNumber", "fname", "lname", "birthday", "email", "position", "department", "actions"];
  public filter: string = '';

  public dataSource: any;

  constructor(public dialog: MatDialog,
    private employeeService: EmployeeService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.employeesChild.currentValue.length) {
      this.dataSource = new MatTableDataSource(changes.employeesChild.currentValue);
    }
  }

  ngOnInit() {

  }

  public deleteEmployee(emp: Employee): void {
    const selectedEmployee = { ...emp };
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
          this.refreshEmployees.emit();
        },
          (error: HttpErrorResponse) => {
            if (error.status == 404) {
              alert("The employee was not found to be deleted")
            }
            else {
              alert("Something went wrong with the server");
            }
          }
        );
      }
    });
  }

  public addEditEmployee(selectedEmployee?: Employee): void {
    console.log('in addedit', selectedEmployee);
    const emp = { ...selectedEmployee };
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: '650px',
      height: '400px',
      data: selectedEmployee ? emp : {
        employeeId: 0, fname: '', lname: '', birthday: '', email: '',
        position: { positionId: 0, name: '', shortName: '' }, department: { departmentId: 0, name: '' }, enabled: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit add dialog was closed', result);
      if (result) {
        if (result.employeeId) {
          this.employeeService.updateEmployee(result).subscribe(
            (response: Employee) => {
              console.log("Updated successfully", response);
              this.refreshEmployees.emit();
            },
            (error: HttpErrorResponse) => {
              if (error.status == 400) {
                alert("The employee is not valid or already exists");
              }
              else if (error.status == 404) {
                alert("The employee was not found to be updated");
              }
              else {
                alert("Something went wrong with the server");
              }
            }
          );
        }
        else {
          this.employeeService.addEmployee(result).subscribe(
            (response: Employee) => {
              console.log("Added successfully", response);
              this.refreshEmployees.emit();
            },
            (error: HttpErrorResponse) => {
              if (error.status == 400) {
                alert("The employee is not valid or already exists");
              }
              else {
                alert("Something went wrong with the server");
                console.log("error", error.message);
                
              }
            }
          );
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
