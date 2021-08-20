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

  public displayedColumns: string[] = ["recordNumber", "entranceTime", "exitTime", "employeeFullName"];
  public records: Record[];

  public filter: string;

  public dataSource: any;
  constructor(private recordService: RecordService) {
    this.records = [];
    this.filter = '';
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

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public resetFilter() {
    this.dataSource.filter = '';
    this.filter = '';
  }
}
