import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CityService } from '../services/city.service';
import { City } from '../models/city';
import { AppComponent } from '../app.component';

@Component({
  selector: 'city-add',
  templateUrl: '../views/city-add.html',
  providers: [UserService, CityService]
})

export class CityAddComponent implements OnInit{

    public titulo: string;
    public city: City;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _cityService: CityService
    ){
      this.titulo = 'Crear ciudad';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.city = new City('');
    }

    ngOnInit(){
      console.log('cargado el componente crear ciudad');
    }

    onSubmit(){
      console.log(this.city);
      this._cityService.addCity(this.token, this.city).subscribe(
        response => {
          if (!response.city) {
              this.alertMessage = '¡Error en el servidor!';
          }else{
              this.alertMessage = '¡La ciudad fue creada correctamente!';
              this.city = response.city;
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
