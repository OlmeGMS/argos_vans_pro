import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RolService } from '../services/rol.service';
import { CostCenterService } from '../services/costCenter.service';
import { CityService } from '../services/city.service';
import { LocationService } from '../services/location.service';
import { EmployeeService } from '../services/employee.service';
import { DriverService } from '../services/driver.service';
import { ArlService } from '../services/arl.service';
import { EpsService } from '../services/eps.service';
import { User } from '../models/user';
import { Rol } from '../models/rol';
import { CostCenter } from '../models/costCenter';
import { City } from '../models/city';
import { Location } from '../models/location';
import { Employee } from '../models/employee';
import { Driver } from '../models/driver';
import { Arl } from '../models/arl';
import { Eps } from '../models/eps';
import { AppComponent } from '../app.component';


@Component({
  selector: 'user-add',
  templateUrl: '../views/user-add.html',
  providers: [UserService, RolService, CostCenterService, LocationService, CityService, EmployeeService, DriverService, ArlService, EpsService]
})

export class  UserAddComponent implements OnInit {
    public titulo: string;
    public user: User;
    public driver: Driver;
    public employee: Employee;
    public cities: City[];
    public arls: Arl[];
    public epss: Eps[];
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
      private _employeeService: EmployeeService,
      private _driverService: DriverService,
      private _arlService: ArlService,
      private _epsService: EpsService
    ){
      this.titulo = 'Crear usuario';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.user = new User('', '', '', '', '', '','', 'null', '', true);
      this.employee = new Employee('', '', '', '', '', true);
      this.driver = new Driver('', '', '', true);
      this.getRolList();
      this.getCostCenterList();
      this.getCityList();
      this.getArlList();
      this.getEpsList();
    }

    ngOnInit(){
      console.log('cargado el componente de crear usuario');
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

    getArlList(){
      this._arlService.getArlList(this.token).subscribe(
        response => {
          console.log(response);
          if(!response.arl){
            this._router.navigate(['/']);
          }else{
            this.arls = response.arl;
            console.log(this.arls);
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

    getEpsList(){
      this._epsService.getEpsList(this.token).subscribe(
        response => {
          console.log(response);
          if(!response.eps){
            this._router.navigate(['/']);
          }else{
            this.epss = response.eps;
            console.log(this.epss);
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



    getRolSelect(rol){
      console.log(rol);
    }

    onSubmit(){
      console.log(this.user);
      if (this.user.rol == '5b9680d67bd7b51b083cf193') {
        this.employee.code = this.employee.code;
        this.employee.address = this.employee.address;
        this.employee.id_cost_center = this.employee.id_cost_center;
        this.employee.id_localidad = this.employee.id_localidad;
      }
      console.log(this.employee);

      this._userService.addUser(this.token, this.user).subscribe(
        response => {
          if (!response.user) {
            this.alertMessage = 'Error en el servidor';
          }else{

            this.user = response.user;
              if (this.user.rol == '5b9680d67bd7b51b083cf193') {
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
              }else if(this.user.rol == '5b9680c67bd7b51b083cf192'){
                this.driver.user = this.user._id;
                console.log(this.driver);
                this._driverService.addDriver(this.token, this.driver).subscribe(
                  response => {
                    if(!response.driver){
                      this.alertMessage = 'Error en el servidor';
                    }else{
                      this.alertMessage = '¡El usuario conductor fue creado correctamente!';
                      this.driver = response.driver;
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
              }else{
                this.alertMessage = '¡El usuario fue creado correctamente!';
                console.log('oss');
              }

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
