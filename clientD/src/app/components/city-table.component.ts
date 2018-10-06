import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CityService } from '../services/city.service';
import { City } from '../models/city';
import { AppComponent } from '../app.component';

@Component({
  selector: 'city-table',
  templateUrl: '../views/city-table.html',
  providers: [UserService, CityService]
})

export class CityTableComponent implements OnInit{

  public titulo: string;
  public cities: City[];
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cityService: CityService
  ){
    this.titulo = 'Ciudades';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
      console.log('cargado el componente de taba de ciudades');
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

  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelCity(){
    this.confirmado = null;
  }

  onDeleteCity(id){
    this._cityService.deleteCity(this.token, id).subscribe(
      response => {
        if (!response.rol){
          alert('Ciudad eliminada');
        }
        this.getCityList();
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
}
