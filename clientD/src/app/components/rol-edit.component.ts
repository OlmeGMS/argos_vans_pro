import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RolService } from '../services/rol.service';
import { Rol } from '../models/rol';
import { AppComponent } from '../app.component';

@Component({
  selector: 'rol-edit',
  templateUrl: '../views/rol-add.html',
  providers: [UserService, RolService]
})

export class RolEditComponent implements OnInit {

  public titulo: string;
  public rol: Rol;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _rolService: RolService
  ) {
    this.titulo = 'Editar rol';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.rol = new Rol('', true);
  }

  ngOnInit() {
    console.log('cargado el coponente de editar rol');
    this.getRol();
  }

  getRol() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._rolService.getRol(this.token, id).subscribe(
        response => {
          if(!response.rol){
            this._router.navigate(['/']);
          }else{
            this.rol = response.rol;
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

      this._rolService.editRol(this.token, id, this.rol).subscribe(
        response => {
            if (!response.rol) {
                this.alertMessage = "Error en el servidor";
            }else{
              this.alertMessage = '¡El rol fue actualizado!'
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
    });
    
  }
}
