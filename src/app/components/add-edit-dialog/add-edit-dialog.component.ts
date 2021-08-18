import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/core/interfaces/employee';
import { FormControl } from '@angular/forms';
import { Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Position } from 'src/app/core/interfaces/position';
import { Department } from 'src/app/core/interfaces/department';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.css']
})
export class AddEditDialogComponent implements OnInit {

  controlPos = new FormControl();
  controlDep = new FormControl();
  positions: string[];
  departments: string[];
  filteredPositions!: Observable<string[]>;
  filteredDepartments!: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee, private employeeService: EmployeeService) {
      this.positions = [];
      this.departments = [];
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getPositions();
    this.getDepartments();

    this.filteredPositions = this.controlPos.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterPos(value))
    );

    this.filteredDepartments = this.controlDep.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterDep(value))
    );
  }

  public getPositions() : void {
    this.employeeService.getPositions().subscribe(
      (response: Position[]) => {
        this.positions = response.map(p => p.name);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getDepartments() : void {
    this.employeeService.getDepartments().subscribe(
      (response: Department[]) => {
        this.departments = response.map(d => d.name);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private _filterPos(value: string): string[] {
    const filterPos = value.toLowerCase();

    return this.positions.filter(option => option.toLowerCase().includes(filterPos));
  }

  private _filterDep(value: string): string[] {
    const filterDep = value.toLowerCase();

    return this.departments.filter(option => option.toLowerCase().includes(filterDep));
  }
}
