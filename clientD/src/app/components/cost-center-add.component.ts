import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { CostCenterService } from '../services/costCenter.service';
import { CostCenter } from '../models/costCenter';
import { AppComponent } from '../app.component';

@Component({
  selector: 'cost-add',
  templateUrl: '../views/cost-center-add.html',
  providers: [UserService, CostCenterService]
})

export class  CostCenterAddComponent implements OnInit {

    public titulo: string;
    public costCenter: CostCenter;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public direccion;
    public dir;
    public nuno;
    public ndos;
    public ntres;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _costCenterService: CostCenterService
    ){
      this.titulo = 'Crear centro de costo';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.costCenter = new CostCenter('','','');
    }

    ngOnInit(){
      console.log('componente de crear centro cargando');
    }

    onSubmit(){
      console.log(this.costCenter);

      this._costCenterService.addCostCenter(this.token, this.costCenter).subscribe(
          response => {
            if(!response.costCenter){
              this.alertMessage = "Error en el servidor";
            }else{
              this.alertMessage = '¡El centro de costos fue creado correctamente!'
              this.costCenter = response.costCenter;
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
