import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArlService } from '../services/arl.service';
import { Arl } from '../models/arl';
import { AppComponent } from '../app.component';

@Component({
  selector: 'arl-table',
  templateUrl: '../views/arl-table.html',
  providers: [UserService, ArlService]
})

export class ArlTableComponent implements OnInit{

  public titulo: string;
  public arls: Arl[];
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _arlService: ArlService
  ){
    this.titulo = 'Arls';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
      console.log('cargado el componente de tabla de arls');
      this.getArlList();
  }

  getArlList(){
    this._arlService.getArlList(this.token).subscribe(
      response => {
        console.log(response);
        if(!response.arl){
          this._router.navigate(['/']);
        }else{
          this.arls = response.arl;
          console.log(this.arls);
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

  onCancelArl(){
    this.confirmado = null;
  }

  onDeleteArl(id){
    this._arlService.deleteArl(this.token, id).subscribe(
      response => {
        if (!response.rol){
          alert('Arl eliminada');
        }
        this.getArlList();
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
