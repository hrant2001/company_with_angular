import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/core/interfaces/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  positions: Map<string,number>;
  departments:Map<string,number>;
  filteredPositions!: Observable<string[]>;
  filteredDepartments!: Observable<string[]>;
  dialogForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee, private employeeService: EmployeeService, private fb: FormBuilder) {
      this.positions = {} as Map<string,number>;
      this.departments = {} as Map<string,number>;
      this.dialogForm = fb.group({
        'fname':['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        'lname':['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        'birthday':['', Validators.required],
        'email':['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        'positionName':['', Validators.required],
        'departmentName':['', Validators.required]
      })
    }

    close(): void {
    this.dialogRef.close();
    }

    save(): void {
      this.dialogForm.value.employeeId = this.data.employeeId;
      this.dialogForm.value.position = {positionId : this.positions.get(this.dialogForm.value.positionName), name: this.dialogForm.value.positionName, shortName: ''}
      this.dialogForm.value.department = {departmentId : this.departments.get(this.dialogForm.value.departmentName), name: this.dialogForm.value.departmentName}
      this.dialogRef.close(this.dialogForm.value);
    }

  ngOnInit(): void {
    this.positions = this.getPositions();    
    this.departments = this.getDepartments();
    const formValue = {
      fname: this.data.fname,
      lname: this.data.lname,
      birthday: this.data.birthday,
      email: this.data.email,
      positionName: this.data.position.name,
      departmentName: this.data.department.name
    }
    this.dialogForm.setValue(formValue);

    this.filteredPositions = this.dialogForm.controls.positionName.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterPos(value))
    );

    this.filteredDepartments = this.dialogForm.controls.departmentName.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterDep(value))
    );
  }

  public getPositions(): Map<string, number> {
    let temp = new Map();
    this.employeeService.getPositions().subscribe(
      (response: Position[]) => {
        response.forEach(n => {
        temp.set(n.name, n.positionId);
        })
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    return temp;
  }

  public getDepartments(): Map<string, number> {
    let temp = new Map();
    this.employeeService.getDepartments().subscribe(
      (response: Department[]) => {
        response.forEach(n => {
          temp.set(n.name, n.departmentId);
          })
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    return temp;
  }

  private _filterPos(value: string): string[] {
    const filterPos = value.toLowerCase();

    return Array.from(this.positions.keys()).filter(option => option.toLowerCase().includes(filterPos));
  }

  private _filterDep(value: string): string[] {
    const filterDep = value.toLowerCase();
    
    return Array.from(this.departments.keys()).filter(option => option.toLowerCase().includes(filterDep));
  }
}
