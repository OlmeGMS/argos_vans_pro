import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { LocationService } from '../services/location.service';
import { CityService } from '../services/city.service';
import { Location } from '../models/location';
import { City } from '../models/city';
import { AppComponent } from '../app.component';

@Component({
  selector: 'location-list',
  templateUrl: '../views/location-list.html',
  providers: [UserService, LocationService, CityService]
})

export class LocationTableComponent implements OnInit {

  public titulo: string;
  public locations: Location[];
  public cities: City[];
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _locationService: LocationService
  ){
    this.titulo = 'Localidades';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('Componente de location-table cargado');
    this.getLocationList();
  }

  getLocationList(){
    this._locationService.getLocationList(this.token).subscribe(
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

  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelRol(){
    this.confirmado = null;
  }

  onDeleteLocation(id){
      this._locationService.deleteLocation(this.token, id).subscribe(
        response => {
          if(!response.location){
            alert('La localidad fue eliminada');
          }
          this.getLocationList();
        },
        error => {
          var errorMessage = <any>error;
              if (errorMessage != null) {
                  var body = JSON.parse(error._body);
                  //this.alertMessage = body.message;
                  console.log(error);
              }
        },
      );
  }
}
