import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import { Record } from 'src/app/core/interfaces/record';
import { RecordService } from 'src/app/core/services/record.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  public displayedColumns: string[] = ["recordNumber", "entranceTime", "exitTime", "employeeFullName", "department"];
  public records: Record[];

  public filter: string;
  public addedDays: boolean = false;
  public addedMonths: boolean = false;

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

  public showDay() {
    if (!this.addedDays) {
      const fromDay = document.createElement('input');
      fromDay.type = 'number';
      fromDay.setAttribute("min", "1");
      fromDay.setAttribute("max", "31");

      const toDay = document.createElement('input');
      toDay.type = 'number';
      toDay.setAttribute("min", "1");
      toDay.setAttribute("max", "31");

      const br = document.createElement("br");
      const dayDiv = document.getElementById("dayDiv");

      dayDiv?.append(fromDay);
      dayDiv?.append(br);
      dayDiv?.append(toDay);

      this.addedDays = true;
    }
  }

  public showMonth() {
    if (!this.addedMonths) {
      const fromMonth = document.createElement('input');
      fromMonth.type = 'month';

      const toMonth = document.createElement('input');
      toMonth.type = 'month';

      const br = document.createElement("br");
      const monthDiv = document.getElementById("monthDiv");

      monthDiv?.append(fromMonth);
      monthDiv?.append(br);
      monthDiv?.append(toMonth);

      this.addedMonths = true;
    }
  }

  public search() {

  }
}
