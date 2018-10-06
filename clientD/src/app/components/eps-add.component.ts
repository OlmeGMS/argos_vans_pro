import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { EpsService } from '../services/eps.service';
import { Eps } from '../models/eps';
import { AppComponent } from '../app.component';

@Component({
  selector: 'eps-add',
  templateUrl: '../views/eps-add.html',
  providers: [UserService, EpsService]
})

export class EpsAddComponent implements OnInit{

  public titulo: string;
  public eps: Eps;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _epsService: EpsService
  ){
    this.titulo = 'Crear eps';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.eps = new Eps('');
  }

  ngOnInit(){
    console.log('cargado el componente crear eps');
  }

  onSubmit(){
    console.log(this.eps);
    this._epsService.addEps(this.token, this.eps).subscribe(
      response => {
        if (!response.eps) {
            this.alertMessage = '¡Error en el servidor!';
        }else{
            this.alertMessage = '¡La eps fue creada correctamente!';
            this.eps = response.eps;
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
