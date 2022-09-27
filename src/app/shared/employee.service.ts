import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee!: Employee;
  employees!: Employee[];
  readonly baseUrl = "http://localhost:3000/employees";


  constructor(private http : HttpClient) { }
    
    // method to add the employee from client to server side    
    postEmployee( emp: Employee ) {
      console.log(emp);
      return this.http.post(this.baseUrl + '/addEmployee', emp);
    }

    getEmployeeList() {
      return this.http.get(this.baseUrl)
    }

    putEmployee(emp: Employee) {
      return this.http.put( this.baseUrl + `/updateEmployee/${emp._id}`, emp );
    }

    deleteEmployee(emp: Employee) {
      return this.http.delete( this.baseUrl + `/deleteEmployee/${emp._id}`);
    }
}
