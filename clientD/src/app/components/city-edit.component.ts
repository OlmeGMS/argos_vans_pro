import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CityService } from '../services/city.service';
import { City } from '../models/city';
import { AppComponent } from '../app.component';

@Component({
  selector: 'city-edit',
  templateUrl: '../views/city-add.html',
  providers: [UserService, CityService]
})

export class CityEditComponent implements OnInit {

  public titulo: string;
  public city: City;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cityService: CityService
  ){
    this.titulo = "Editar ciudad";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.city = new City('');
    this.getCity();
  }

  ngOnInit(){
    console.log('Cargado componenete de editar ciudad');
  }

  getCity(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._cityService.getCity(this.token, id).subscribe(
          response => {
            if(!response.city){
              this._router.navigate(['/']);
            }else{
              this.city = response.city;
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

      this._cityService.editCity(this.token, id, this.city).subscribe(
        response => {
          if(!response){
            this.alertMessage = "Error en el servidor";
          }else{
            this.alertMessage = '¡La ciudad fue actualizada!';
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
    });
  }
}
