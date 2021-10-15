import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Record } from 'src/app/core/interfaces/record';
import { RecordService } from 'src/app/core/services/record.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  public displayedColumns: string[] = ["recordNumber", "entranceTime", "exitTime", "employeeFullName", "department"];
  public records: Record[] =[];

  public day: string = '';
  public empOrDep: string = '';
  public isEmp: string = 'employee';
  public addedDay: boolean = false;

  public dataSource: any;
  constructor(private recordService: RecordService) {
  }

  ngOnInit(): void {
    this.getRecords();
  }

  public getRecords(): void {
    this.recordService.getRecords().subscribe(
      (response: Record[]) => {
        this.records = response;
        this.dataSource = new MatTableDataSource(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public resetFilter() {
    this.empOrDep = '';    
  }

  public shouldShowDay() {
    this.day = '';
    this.addedDay = !this.addedDay;
  }

  public search() {
    this.recordService.getRecordsByCriteria(this.isEmp === "employee", this.empOrDep, this.day).subscribe(
      (response: Record[]) => {
        this.records = response;
        this.dataSource = new MatTableDataSource(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
