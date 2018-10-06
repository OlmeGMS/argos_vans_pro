import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArlService } from '../services/arl.service';
import { Arl } from '../models/arl';
import { AppComponent } from '../app.component';

@Component({
  selector: 'arl-add',
  templateUrl: '../views/arl-add.html',
  providers: [UserService, ArlService]
})

export class ArlAddComponent implements OnInit{

  public titulo: string;
  public arl: Arl;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _arlService: ArlService
  ){
    this.titulo = 'Crear arl';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.arl = new Arl('');
  }

  ngOnInit(){
    console.log('cargado el componente crear arl');
  }

  onSubmit(){
    console.log(this.arl);
    this._arlService.addArl(this.token, this.arl).subscribe(
      response => {
        if (!response.arl) {
            this.alertMessage = '¡Error en el servidor!';
        }else{
            this.alertMessage = '¡La arl fue creada correctamente!';
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
  }
}
