import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { EpsService } from '../services/eps.service';
import { Eps } from '../models/eps';
import { AppComponent } from '../app.component';

@Component({
  selector: 'eps-edit',
  templateUrl: '../views/eps-add.html',
  providers: [UserService, EpsService]
})

export class EpsEditComponent implements OnInit {

  public titulo: string;
  public eps: Eps;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _epsService: EpsService
  ){
    this.titulo = "Editar Eps";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.eps = new Eps('');

  }

  ngOnInit(){
    console.log('Cargado componenete de editar eps');
    this.getEps();
  }

  getEps(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._epsService.getEps(this.token, id).subscribe(
          response => {
            if(!response.eps){
              this._router.navigate(['/']);
            }else{
              this.eps = response.eps;
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

      this._epsService.editEps(this.token, id, this.eps).subscribe(
        response => {
          if(!response){
            this.alertMessage = "Error en el servidor";
          }else{
            this.alertMessage = '¡La eps fue actualizada!';
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
    });
  }
}
