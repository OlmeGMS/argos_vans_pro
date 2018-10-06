import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RateService } from '../services/rate.service';
import { CityService } from '../services/city.service';
import { LocationService } from '../services/location.service';
import { Rate } from '../models/rate';
import { City } from '../models/city';
import { Location } from '../models/location';
import { AppComponent } from '../app.component';

@Component({
  selector: 'rate-edit',
  templateUrl: '../views/rate-edit.html',
  providers: [UserService, RateService, CityService, LocationService]
})

export class RateEditComponent implements OnInit {

  public titulo: string;
  public rate: Rate;
  public cities: City[];
  public citiesdes: City[];
  public locations: Location[];
  public locationsdes: Location[];
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _rateService: RateService,
    private _cityService: CityService,
    private _locationService: LocationService
  ){
    this.titulo = "Editar tarifa";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.rate = new Rate('','','');
    this.getRate();
  }

  ngOnInit(){
    console.log('Cargado componenete de editar ciudad');
    this.getCityList();
    this.getCityListDestination();
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

  getCityListDestination(){
    this._cityService.getCityList(this.token).subscribe(
      response => {
        if(!response.cities){
          this._router.navigate(['/']);
        }else{
          this.citiesdes = response.cities;
          console.log(this.citiesdes);
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

  getRateCity(id_citys){
    console.log(id_citys);

    this._rateService.searchLocation(this.token, id_citys).subscribe(
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

  getRateCityDestination(id_city){
    console.log(id_city);

    this._rateService.searchLocation(this.token, id_city).subscribe(
      response => {
        if (!response.locations) {
            this._router.navigate(['/']);
        }else{
            this.locationsdes = response.locations;
            console.log(this.locationsdes);
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

  getRate(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._rateService.getRate(this.token, id).subscribe(
          response => {
            if(!response.rate){
              this._router.navigate(['/']);
            }else{
              this.rate = response.rate;
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

      this._rateService.editRate(this.token, id, this.rate).subscribe(
        response => {
          if(!response){
            this.alertMessage = "Error en el servidor";
          }else{
            this.alertMessage = '¡La tarifa fue actualizada!';
            this.rate = response.rate;
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
