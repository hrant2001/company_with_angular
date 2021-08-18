import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './core/services/employee.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesComponent } from './components/employees/employees.component';
import { ButtonComponent } from './components/button/button.component';
import { GlobalTabsComponent } from './components/global-tabs/global-tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { EmployeesTabsComponent } from './components/employees-tabs/employees-tabs.component';
import { AddEditDialogComponent } from './components/add-edit-dialog/add-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    ButtonComponent,
    GlobalTabsComponent,
    EmployeesTabsComponent,
    AddEditDialogComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
