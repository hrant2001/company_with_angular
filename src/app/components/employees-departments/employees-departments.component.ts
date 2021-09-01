import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/interfaces/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-employees-departments',
  templateUrl: './employees-departments.component.html',
  styleUrls: ['./employees-departments.component.css']
})
export class EmployeesDepartmentsComponent implements OnInit {

  @Input() public employeesDep: Employee[] = [];
  public fileName = 'employees_by_departments.xlsx';  

  constructor(private employeeService: EmployeeService) { 
  }

  ngOnInit() {
    
  }

  public exportexcel(): void 
    {
      /* table id is passed over here */   
      let element = document.getElementById('deps'); 
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }
}
