import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RolService } from '../services/rol.service';
import { Rol } from '../models/rol';
import { AppComponent } from '../app.component';


@Component({
  selector: 'rol-add',
  templateUrl: '../views/rol-add.html',
  providers: [UserService, RolService]
})

export class RolAddComponent implements OnInit {
    public titulo: string;
    public rol: Rol;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _rolService: RolService
    ){
      this.titulo = 'Crear rol';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.rol = new Rol('', true);
    }

    ngOnInit(){
      console.log('cargado el component de rol-add.component.ts');
    }

    onSubmit(){
      console.log(this.rol);

      this._rolService.addRol(this.token, this.rol).subscribe(
        response => {
          if (!response.rol) {
              this.alertMessage = "Error en el servidor";
          }else{
            this.alertMessage = '¡ El rol fue creado correctamente !';
            this.rol = response.rol;
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
