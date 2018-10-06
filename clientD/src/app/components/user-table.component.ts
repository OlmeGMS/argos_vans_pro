import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RolService } from '../services/rol.service';
import { User } from '../models/user';
import { Rol } from '../models/rol';
import { AppComponent } from '../app.component';

@Component({
  selector: 'user-table',
  templateUrl: '../views/user-table.html',
  providers: [UserService, RolService]
})

export class UserTableComponent implements OnInit {

  public titulo: string;
  public roles: Rol[];
  public users: User[];
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _rolService: RolService,
  ) {
    this.titulo = 'Usuarios',
      this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('cargado la tabla de usuario');
    this.getUserTablet();
  }

  getUserTablet() {
    this._userService.getUserTablet(this.token).subscribe(
      response => {
        if (!response.users) {
          this._router.navigate(['/']);
        } else {
          this.users = response.users;
          console.log(this.users);
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

  onDeleteConfirm(id) {
    this.confirmado = id;
  }

  onCancelUser() {
    this.confirmado = null;
  }

  onDeleteUser(id) {
    this._userService.deleteUser(this.token, id).subscribe(
      response => {
        if (!response.rol) {
          alert('Usuario eliminado');
        }
        this.getUserTablet();
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
