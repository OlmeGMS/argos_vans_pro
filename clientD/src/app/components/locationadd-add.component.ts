import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { LocationAddService } from '../services/locationadd.service';
import { LocationAdd } from '../models/locationAdd';
import { AppComponent } from '../app.component';

@Component({
  selector: 'locationadd-add',
  templateUrl: '../views/locationadd-add.html',
  providers: [UserService, LocationAddService]
})

export class LocationAddAddComponent implements OnInit{

    public titulo: string;
    public locationAdd: LocationAdd;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _locationAddService: LocationAddService
    ){
      this.titulo = 'Crear precio localidad adicional';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.locationAdd = new LocationAdd('');
    }

    ngOnInit(){
      console.log('cargado el componente crear ciudad');
    }

    onSubmit(){
      console.log(this.locationAdd);
      this._locationAddService.addLocationAdd(this.token, this.locationAdd).subscribe(
        response => {
          if (!response.locationAdd) {
              this.alertMessage = '¡Error en el servidor!';
          }else{
              this.alertMessage = '¡El precio de la localidad fue creada correctamente!';
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
    }
}
