import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesTabsComponent } from './employees-tabs.component';

describe('EmployeesTabsComponent', () => {
  let component: EmployeesTabsComponent;
  let fixture: ComponentFixture<EmployeesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
