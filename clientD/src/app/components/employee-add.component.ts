import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RolService } from '../services/rol.service';
import { EmployeeService } from '../services/employee.service';
import { CostCenterService } from '../services/costCenter.service';
import { CityService } from '../services/city.service';
import { LocationService } from '../services/location.service';
import { User } from '../models/user';
import { Rol } from '../models/rol';
import { CostCenter } from '../models/costCenter';
import { City } from '../models/city';
import { Location } from '../models/location';
import { Employee } from '../models/employee';
import { AppComponent } from '../app.component';

@Component({
  selector: 'employee-add',
  templateUrl: '../views/employee-add.html',
  providers: [UserService, RolService, CostCenterService, LocationService, CityService, EmployeeService]
})

export class EmployeeAddComponent implements OnInit {
  public titulo: string;
  public user: User;
  public employee: Employee;
  public cities: City[];
  public locations: Location[];
  public costCenters: CostCenter[];
  public center: CostCenter;
  public roles: Rol[];
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _rolService: RolService,
    private _costCenterService: CostCenterService,
    private _cityService: CityService,
    private _employeeService: EmployeeService
  ){
    this.titulo = 'Crear usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User('', '', '', '', '', '','', 'null', '', true);
    this.employee = new Employee('', '', '', '', '', true);
    this.getRolList();
    this.getCostCenterList();
    this.getCityList();
  }
  ngOnInit(){
    console.log('cargado el componente de crear usuario empleado');
  }

  getRolList(){
    this._rolService.getRolList(this.token).subscribe(
      response => {
        if (!response.roles) {
          this._router.navigate(['/']);
        }else{
          this.roles = response.roles;
          console.log(this.roles);
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

  getCostCenterList(){
    this._costCenterService.getCostCenterList(this.token).subscribe(
      response => {
        console.log(response);
        if(!response.costCenter){
          this._router.navigate(['/']);
        }else{
          this.costCenters = response.costCenter;
          console.log(this.costCenters);
        }
      },
      error => {
        var errorMessage = <any>error;
           if (errorMessage != null) {
             var body = JSON.parse(error._body);
             console.log(error);
           }
      }
    );
  }

  getCityList(){
    this._cityService.getCityList(this.token).subscribe(
      response => {
        if(!response.cities){
          this._router.navigate(['/']);
        }else{
          this.cities = response.cities;
          console.log(this.cities);
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

  getCityLocations(id_city){
    console.log(id_city);

    this._userService.searchLocation(this.token, id_city).subscribe(
      response => {
        if (!response.locations) {
            this._router.navigate(['/']);
        }else{
            this.locations = response.locations;
            console.log(this.locations);
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);

          console.log(error);
        }
      }
    );

  }



  getRolSelect(rol){
    console.log(rol);
  }

  onSubmit(){
    this.user.rol = '5b9680d67bd7b51b083cf193';
    console.log(this.user);

      this.employee.code = this.employee.code;
      this.employee.address = this.employee.address;
      this.employee.id_cost_center = this.employee.id_cost_center;
      this.employee.id_localidad = this.employee.id_localidad;

    console.log(this.employee);

    this._userService.addUser(this.token, this.user).subscribe(
      response => {
        if (!response.user) {
          this.alertMessage = 'Error en el servidor';
        }else{

          this.user = response.user;

              console.log('ooy');

              this.employee.id_user = this.user._id;

              console.log(this.employee);
              this._employeeService.addEmployee(this.token, this.employee).subscribe(
                response => {
                  if(!response.employee){
                    this.alertMessage = 'Error en el servidor';
                  }else{
                    this.alertMessage = '¡El usuario empleado fue creado correctamente!';
                    this.employee = response.employee;
                  }
                },
                error => {
                  var errorMessage = <any>error;
                   if(errorMessage != null){
                     var body = JSON.parse(error._body);
                     this.alertMessage = body.message;
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
           this.alertMessage = body.message;
           console.log(error);
         }
      }
    );

  }

}
