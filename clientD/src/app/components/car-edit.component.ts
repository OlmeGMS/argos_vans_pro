import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { AppComponent } from '../app.component';

@Component({
  selector: 'car-edit',
  templateUrl: '../views/car-add.html',
  providers: [UserService, CarService]
})

export class CarEditComponent implements OnInit {

    public titulo: string;
    public car: Car;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit = true;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _carService: CarService
    ){
      this.titulo = "Editar vehículo";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.car = new Car('','','', true);
      this.getCar();
    }

    ngOnInit(){
        console.log('Componente de edicar vehículo cargado');
    }

    getCar(){
      this._route.params.forEach((params: Params) => {
        let id = params['id'];
        this._carService.getCar(this.token, id).subscribe(
            response => {
              if(!response.car){
                this._router.navigate(['/']);
              }else{
                this.car = response.car;
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

        this._carService.editCar(this.token, id, this.car).subscribe(
          response => {
            if(!response){
              this.alertMessage = "Error en el servidor";
            }else{
              this.alertMessage = '¡El vehículo fue actualizado!';
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
      });

    }

}
