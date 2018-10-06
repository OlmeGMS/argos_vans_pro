import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RateService } from '../services/rate.service';
import { Rate } from '../models/rate';
import { AppComponent } from '../app.component';

@Component({
  selector: 'rate-table',
  templateUrl: '../views/rate-table.html',
  providers: [UserService, RateService]
})

export class RateTableComponent implements OnInit {

    public titulo: string;
    public rates: Rate[];
    public identity;
    public token;
    public url: string;
    public confirmado;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _rateService: RateService
    ){
      this.titulo = 'Tarifas';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('Cargado el componente de tabla de tarifas');
        this.getRateList();
    }

    getRateList(){
      this._rateService.getRateList(this.token).subscribe(
        response => {
          if(!response.rates){
            this._router.navigate(['/']);

          }else{
            this.rates = response.rates;
            console.log(this.rates);
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

    onDeleteConfirm(id){
      this.confirmado = id;
    }

    onCancelRate(){
      this.confirmado = null;
    }

    onDeleteRate(id){
      this._rateService.deleteRate(this.token, id).subscribe(
        response => {
          if(!response.rate){
            alert('¡Tarifa eliminada!');
          }
          this.getRateList();
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

}
