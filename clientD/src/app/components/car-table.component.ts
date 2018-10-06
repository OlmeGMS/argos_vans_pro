import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { AppComponent } from '../app.component';

@Component({
  selector: 'car-table',
  templateUrl: '../views/car-table.html',
  providers: [UserService, CarService]
})

export class CarTableComponent implements OnInit {

    public titulo: string;
    public cars: Car[];
    public identity;
    public token;
    public url: string;
    public confirmado;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _carService: CarService
    ){
      this.titulo = 'Vehículos';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('Cargado el componente de tabla de vehículos');
        this.getCarList();
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

    onDeleteConfirm(id){
      this.confirmado = id;
    }

    onCancelCar(){
      this.confirmado = null;
    }

    onDeleteCar(id){
      this._carService.deleteCar(this.token, id).subscribe(
        response => {
          if(!response.car){
            alert('Vehículo eliminado');
          }
          this.getCarList();
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

}
