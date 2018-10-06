import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { AppComponent } from '../app.component';

@Component({
  selector: 'car-add',
  templateUrl: '../views/car-add.html',
  providers: [UserService, CarService]
})

export class  CarAddComponent implements OnInit {

  public titulo: string;
  public car: Car;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public puntero;
  public placa_buscada;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ){
    this.titulo = 'Crear vehículo',
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.car = new Car('', '', '', true);
  }

  ngOnInit(){
    console.log('Cargado el componnente de crear vehículo');
  }

  onSubmit(){
    console.log(this.car);

    this._carService.searchCar(this.token, this.car.placa).subscribe(

      response => {

        if (!response.cars ) {
          this.alertMessage = '¡Error en el servidor!';

        }else{
            this.placa_buscada = response.cars;
            console.log(this.car);
            if (Object.entries(this.placa_buscada).length === 0) {
              this._carService.addCar(this.token, this.car).subscribe(
                response => {
                  if (!response.car) {
                      this.alertMessage = '¡Error en el servidor!';
                  }else{
                      this.alertMessage = '¡El carro fue creado correctamente!';
                      this.car = response.car;
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
              this.alertMessage = '¡El vehículo ya existe!';
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
