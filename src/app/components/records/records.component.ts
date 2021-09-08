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

  public from: string = '';
  public to: string = '';
  public empOrDep: string = '';
  public isEmp: string = 'employee';
  public addedFrom: boolean = false;
  public addedTo: boolean = false;

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

  public shouldShowFrom() {
    this.addedFrom = !this.addedFrom;
  }

  public shouldShowTo() {
    this.addedTo = !this.addedTo;
  }

  public search() {
    // //this.recordService.getRecordsByCriteria(); //provide criteria from hmtl
    // console.log("You searched for ", this.from, this.to, this.empOrDep, this.isEmp);
    // this.recordService.getRecordsByCriteria(this.from, this.to, this.empOrDep, this.isEmp === "employee"); //provide criteria from hmtl
  }
}
