import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { DriverService } from '../services/driver.service';
import { CarService } from '../services/car.service';
import { DriverCarService } from '../services/driverCar.service';
import { Driver } from '../models/driver';
import { Car } from '../models/car';
import { DriverCar } from '../models/driver_car';
import { AppComponent } from '../app.component';

@Component({
  selector: 'drivercar-edit',
  templateUrl: '../views/drivercar-add.html',
  providers: [UserService, DriverService, CarService, DriverCarService ]
})

export class DriverCarEditComponent implements OnInit {

  public titulo: string;
  public driverCar: DriverCar;
  public drivers: Driver[];
  public cars: Car[];
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService,
    private _driverService: DriverService,
    private _driverCarService: DriverCarService
  ){
    this.titulo = "Editar prestador";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.driverCar = new DriverCar('', '', true);
    this.getDriverCar();
    this.getDriverList();
    this.getCarList();
  }

  ngOnInit(){
    console.log('Cargado componenete de editar ciudad');
  }
  getDriverList(){
    this._driverService.getDriverList(this.token).subscribe(
      response => {
        if(!response.drivers){
          this._router.navigate(['/']);
        }else{
          this.drivers = response.drivers;
          console.log(this.drivers);
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

  getCarList(){
    this._carService.getCarList(this.token).subscribe(
      response => {
        if(!response.cars){
          this._router.navigate(['/']);

        }else{
          this.cars = response.cars;
          console.log(this.cars);

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

  getDriverCar(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._driverCarService.getDriverCar(this.token, id).subscribe(
          response => {
            if(!response.driverCar){
              this._router.navigate(['/']);
            }else{
              this.driverCar = response.driverCar;
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
    });

  }

  onSubmit(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._driverCarService.editDriverCar(this.token, id, this.driverCar).subscribe(
        response => {
          if(!response){
            this.alertMessage = "Error en el servidor";
          }else{
            this.alertMessage = '¡El proveedor fue actualizado!';
            this.driverCar = response.driverCar;
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
    });
  }
}
