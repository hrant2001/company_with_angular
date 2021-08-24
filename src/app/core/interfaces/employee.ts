import { Department } from "./department";
import { Position } from "./position";

export interface Employee {
    employeeId: number;
    fname: string;
    lname: string;
    birthday: Date;
    email: string;
    position: Position;
    department: Department;
    enabled: boolean;
}