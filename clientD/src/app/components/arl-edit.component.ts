import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArlService } from '../services/arl.service';
import { Arl } from '../models/arl';
import { AppComponent } from '../app.component';

@Component({
  selector: 'arl-edit',
  templateUrl: '../views/arl-add.html',
  providers: [UserService, ArlService]
})

export class ArlEditComponent implements OnInit {

  public titulo: string;
  public arl: Arl;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _arlService: ArlService
  ){
    this.titulo = "Editar ciudad";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.arl = new Arl('');
    this.getArl();
  }

  ngOnInit(){
    console.log('Cargado componenete de editar arl');
    this.getArl();
  }

  getArl(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._arlService.getArl(this.token, id).subscribe(
          response => {
            if(!response.city){
              this._router.navigate(['/']);
            }else{
              this.arl = response.arl;
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

      this._arlService.editArl(this.token, id, this.arl).subscribe(
        response => {
          if(!response){
            this.alertMessage = "Error en el servidor";
          }else{
            this.alertMessage = '¡La arl fue actualizada!';
            this.arl = response.arl;
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
