import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CityService } from '../services/city.service';
import { LocationService } from '../services/location.service';
import { City } from '../models/city';
import { Location } from '../models/location';
import { AppComponent } from '../app.component';

@Component({
  selector: 'location-add',
  templateUrl: '../views/location-add.html',
  providers: [UserService, CityService, LocationService]
})

export class LocationAddComponent implements OnInit {

    public titulo: string;
    public cities: City[];
    public location: Location;
    public identity;
    public token;
    public url: string;
    public alertMessage;


    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _cityService: CityService,
      private _locationService: LocationService
    ){
      this.titulo = 'Crear Localidad';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.location = new Location('', '');
    }

    ngOnInit(){
      console.log('Cargado el componente de crear localidad');
      this.getCityList();
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



    onSubmit(){
      console.log(this.location);

      this._locationService.addLocation(this.token, this.location).subscribe(
        response => {
          if(!response.location){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'La localidad fue creada correctamente';
            this.location = response.location;
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
