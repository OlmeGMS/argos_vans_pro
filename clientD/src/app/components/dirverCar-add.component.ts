import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { DriverService } from '../services/driver.service';
import { CarService } from '../services/car.service';
import { DriverCarService } from '../services/driverCar.service';
import { User } from '../models/user';
import { Driver } from '../models/driver';
import { Car } from '../models/car';
import { DriverCar } from '../models/driver_car';
import { AppComponent } from '../app.component';

@Component({
  selector: 'driverCar-add',
  templateUrl: '../views/drivercar-add.html',
  providers: [UserService, CarService, DriverService, DriverCarService]
})

export class DriverCarAddComponent implements OnInit {
  public titulo: string;
  public user: User;
  public drivers: Driver[];
  public cars: Car[];
  public driverCar : DriverCar;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService,
    private _driverService: DriverService,
    private _driverCarService: DriverCarService
  ){
    this.titulo = 'Crear prestador del servicio';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.driverCar = new DriverCar('','',true);
  }

  ngOnInit(){
    console.log('cargado el componente de crear drivercar');
    this.getDriverList();
    this.getCarList();
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



  onSubmit(){
    console.log(this.driverCar);

    this._driverCarService.addDriverCar(this.token, this.driverCar).subscribe(
      response => {
        if (!response.driverCar) {
            this.alertMessage = '¡Error en el servidor!';
        }else{
            this.alertMessage = '¡EL prestador fue creado correctamente!';
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

  }



}
