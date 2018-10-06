import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { AppComponent } from '../app.component';

@Component({
  selector: 'employee-table',
  templateUrl: '../views/employee-table.html',
  providers: [UserService, EmployeeService]
})

export class EmployeeTableAdminComponent implements OnInit{

  public titulo: string;
  public employees: Employee[];
  public employee:  Employee;
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _employeeService: EmployeeService
  ){
    this.titulo = 'Empleados';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.employee = new Employee('', '', '', '', '', false);
  }

  ngOnInit(){
    this.getEmployeeListAdmin();
  }

  getEmployeeListAdmin(){
    this._employeeService.getEmployeeListAdmin(this.token).subscribe(
      response => {
        if(!response.employees){
          this._router.navigate(['/']);
        }else{
          this.employees = response.employees;
          console.log(this.employees);
        }
      },
      error => {
        var errorMessage = <any>error;
           if (errorMessage != null) {
             var body = JSON.parse(error._body);
             //this.alertMessage = body.message;
             console.log(error);
           }
      }
    );
  }

  onDeleteConfirm(id){
    this.confirmado = id;
  }
  onFalseConfirm(id){
    this.confirmado = id;
  }

  onCancelEmployee(){
    this.confirmado = null;
  }

  onDeleteEmployee(id){
    this._employeeService.deleteEmployee(this.token, id).subscribe(
      response => {
        if (!response.rol){
          alert('Empleado eliminado');
        }
        this.getEmployeeListAdmin();
      },
      error => {
        var errorMessage = <any>error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                //this.alertMessage = body.message;
                console.log(error);
            }
      }
    );
  }



  onFalseEmployee(id){

    this._employeeService.getEmployee(this.token, id).subscribe(
        response => {
          if(!response.employee){
            this._router.navigate(['/']);
          }else{
            this.employee = response.employee;
            this.employee.status = false;
            this._employeeService.onFalseEmployee(this.token, id, this.employee).subscribe(
              response => {
                if (!response.rol){
                  alert('Empleado eliminado');
                }
                this.getEmployeeListAdmin();
              },
              error => {
                var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        //this.alertMessage = body.message;
                        console.log(error);
                    }
              }
            );
          }
        },
        error => {
          var errorMessage = <any>error;
           if(errorMessage != null){
             var body = JSON.parse(error._body);
             console.log(error);
           }
        }
    );



  }

}
