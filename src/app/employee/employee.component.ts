import { Component, OnInit } from '@angular/core';

// importing the employee service which serve the data and upload the data from front-end
// to backend
import { EmployeeService } from '../shared/employee.service';
import '../app.module';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { from } from 'rxjs';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor( public employeeService: EmployeeService /* Constructor parameter */ ) {

  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.value._id == "") {
        this.employeeService.postEmployee(form.value).subscribe( (res) => {
        this.resetForm(form);
        M.toast({html: 'Saved successfully', classes: 'rounded'});
      } );
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe( (res) => {
        this.resetForm(form);
        M.toast({html: 'Update successfully', classes: 'rounded'});
      } )
    }
    
  }

  resetForm( form?: NgForm ) {
    if (form) {
      form.reset();
    }

    this.employeeService.selectedEmployee = {
      _id: "",
      firstName: "",
      lastName: "",
      email: ""
    }

    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      console.log(res);
      
      this.employeeService.employees = res as Employee[];
      
    })
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(emp: Employee) {
    console.log(emp._id);
    this.employeeService.deleteEmployee( emp ).subscribe((res) => {
      this.refreshEmployeeList();
      M.toast({html: 'delete successfully', classes: 'rounded'});
    })
  }

}
