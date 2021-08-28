import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesDepartmentsComponent } from './employees-departments.component';

describe('EmployeesDepartmentsComponent', () => {
  let component: EmployeesDepartmentsComponent;
  let fixture: ComponentFixture<EmployeesDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesDepartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
