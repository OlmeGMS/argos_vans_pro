import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RolService } from '../services/rol.service';
import { DriverService } from '../services/driver.service';
import { EpsService } from '../services/eps.service';
import { ArlService } from '../services/arl.service';
import { User } from '../models/user';
import { Rol } from '../models/rol';
import { Arl } from '../models/arl';
import { Eps } from '../models/eps';
import { Driver } from '../models/driver';
import { AppComponent } from '../app.component';

@Component({
  selector: 'driver-edit',
  templateUrl: '../views/driver-edit.html',
  providers: [UserService, RolService, EpsService, ArlService, DriverService]
})

export class DriverEditComponent implements OnInit {

  public titulo: string;
  public user: User;
  public driver: Driver;

  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,

    private _driverService: DriverService
  ){
    this.titulo = 'Actualizar conductor';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User('', '', '', '', '', '','', 'null', '', true);
    this.driver = new Driver('', '', '', true);

    this.getDriver();
  }
  ngOnInit(){
    console.log('cargado el componente de editar usuario conductor');
  }

  getDriver(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._driverService.getDriver(this.token, id).subscribe(
          response => {
            if(!response.driver){
              this._router.navigate(['/']);
            }else{
              this.driver = response.driver;
              console.log(this.driver);
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

    console.log(this.driver);
    console.log('Cargado');
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._driverService.editDriver(this.token, id, this.driver).subscribe(
        response => {
          if(!response){
            this.alertMessage = "Error en el servidor";
          }else{
            this.alertMessage = '¡Conductor cambio de estado!';
            this.driver = response.driver;
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
