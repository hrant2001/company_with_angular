import { Employee } from "./employee";

export interface Record {
    recordId: number;
    entranceTime: Date;
    exitTime: Date;
    employee: Employee;
    employeeFullName: string;
}