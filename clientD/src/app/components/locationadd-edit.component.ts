import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { LocationAddService } from '../services/locationadd.service';
import { LocationAdd } from '../models/locationAdd';
import { AppComponent } from '../app.component';

@Component({
  selector: 'locationadd-edit',
  templateUrl: '../views/locationadd-add.html',
  providers: [UserService, LocationAddService]
})

export class LocationAddEditComponent implements OnInit {

  public titulo: string;
  public locationAdd: LocationAdd;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _locationAddService: LocationAddService
  ){
    this.titulo = "Editar valor localidad adicional";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.locationAdd = new LocationAdd('');
    this.getLocationAdd();
  }

  ngOnInit(){
    console.log('Cargado componenete de editar ciudad');
  }

  getLocationAdd(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._locationAddService.getLocationAdd(this.token, id).subscribe(
          response => {
            if(!response.locationAdd){
              this._router.navigate(['/']);
            }else{
              this.locationAdd = response.locationAdd;
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

      this._locationAddService.editLocationAdd(this.token, id, this.locationAdd).subscribe(
        response => {
          if(!response){
            this.alertMessage = "Error en el servidor";
          }else{
            this.alertMessage = '¡La ciudad fue actualizada!';
            this.locationAdd = response.locationAdd;
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
