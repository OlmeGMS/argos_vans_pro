import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RolService } from '../services/rol.service';
import { Rol } from '../models/rol';
import { AppComponent } from '../app.component';

@Component({
  selector: 'rol-list',
  templateUrl: '../views/rol-list.html',
  providers: [UserService, RolService]
})

export class RolListComponent implements OnInit {
      public titulo: string;
      public roles: Rol[];
      public identity;
      public token;
      public url: string;
      public confirmado;

      constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _rolService: RolService
      ){
        this.titulo = 'Roles';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
      }

      ngOnInit(){
        console.log('rol-list.component.ts cargado');
        this.getRolList();
      }

      getRolList(){
        this._rolService.getRolList(this.token).subscribe(
          response => {
            if (!response.roles) {
              this._router.navigate(['/']);
            }else{
              this.roles = response.roles;
              console.log(this.roles);
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

      onCancelRol() {
        this.confirmado = null;
      }

      onDeleteRol(id){
        this._rolService.deleteRol(this.token, id).subscribe(
          response => {
            if (!response.rol) {
                alert('Rol eliminado');
            }
            this.getRolList();
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
