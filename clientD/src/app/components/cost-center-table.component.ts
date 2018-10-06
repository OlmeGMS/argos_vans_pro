import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CostCenterService } from '../services/costCenter.service';
import { CostCenter } from '../models/costCenter';
import { AppComponent } from '../app.component';

@Component({
  selector: 'centro-list',
  templateUrl: '../views/centro-table.html',
  providers: [UserService, CostCenterService]
})

export class CostCenterTableComponent implements OnInit {

    public titulo: string;
    public costCenters: CostCenter[];
    public center: CostCenter;
    public identity;
    public token;
    public url: string;
    public confirmado;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _costCenterService: CostCenterService
    ){
      this.titulo = 'Centros de costos';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
    }

    ngOnInit(){
      console.log('componente de tabla de cnetro de costos cargado');
      this.getCostCenterList();
    }

    getCostCenterList(){
      this._costCenterService.getCostCenterList(this.token).subscribe(
        response => {
          console.log(response);
          if(!response.costCenter){
            this._router.navigate(['/']);
          }else{
            this.costCenters = response.costCenter;
            console.log(this.costCenters);
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

    onCancelCostCenter() {
      this.confirmado = null;
    }

    onDeleteCostCenter(id){
      this._costCenterService.deleteCostCenter(this.token, id).subscribe(
        response => {
          if (!response.costCenter) {
              alert('Centro de costo eliminado');
          }
          this.getCostCenterList();
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
