import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { EpsService } from '../services/eps.service';
import { Eps } from '../models/eps';
import { AppComponent } from '../app.component';

declare const $;

@Component({
  selector: 'eps-table',
  templateUrl: '../views/eps-table.html',
  providers: [UserService, EpsService]
})

export class EpsTableComponent implements OnInit{

  public titulo: string;
  public epss: Eps[];
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _epsService: EpsService
  ){
    this.titulo = 'Eps';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
      console.log('cargado el componente de tabla de eps');
      this.getEpsList();
  }

  getEpsList(){
    this._epsService.getEpsList(this.token).subscribe(
      response => {
        console.log(response);
        if(!response.eps){
          this._router.navigate(['/']);
        }else{
          this.epss = response.eps;
          console.log(this.epss);
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

  onCancelEps(){
    this.confirmado = null;
  }

  onDeleteEps(id){
    this._epsService.deleteEps(this.token, id).subscribe(
      response => {
        if (!response.rol){
          alert('Eps eliminada');
        }
        this.getEpsList();
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
