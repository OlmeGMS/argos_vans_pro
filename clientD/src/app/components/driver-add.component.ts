import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { RolService } from '../services/rol.service';
import { DriverService } from '../services/driver.service';
import { ArlService } from '../services/arl.service';
import { EpsService } from '../services/eps.service';
import { User } from '../models/user';
import { Rol } from '../models/rol';
import { Arl } from '../models/arl';
import { Eps } from '../models/eps';
import { Driver } from '../models/driver';
import { AppComponent } from '../app.component';

@Component({
  selector: 'driver-add',
  templateUrl: '../views/driver-add.html',
  providers: [UserService, RolService, ArlService, EpsService, DriverService]
})

export class DriverAddComponent implements OnInit {

  public titulo: string;
  public user: User;
  public driver: Driver;
  public epss: Eps[];
  public arls: Arl[];
  public roles: Rol[];
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _rolService: RolService,
    private _epsService: EpsService,
    private _arlService: ArlService,
    private _driverService: DriverService
  ){
    this.titulo = 'Crear usuario conductor';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User('', '', '', '', '', '','', 'null', '', true);
    this.driver = new Driver('', '', '', true);
    this.getRolList();
    this.getArlList();
    this.getEpsList();
  }

  ngOnInit(){
    console.log('cargado el componente de crear usuario conductor');
  }

  getRolList(){
    this._rolService.getRolList(this.token).subscribe(
      response => {
        if (!response.roles) {
          this._router.navigate(['/']);
        }else{
          this.roles = response.roles;
          console.log(this.roles);
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
             console.log(error);
           }
      }
    );
  }

  getEpsList(){
    this._epsService.getEpsList(this.token).subscribe(
      response => {
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

  onSubmit(){
    this.user.rol = '5b9680c67bd7b51b083cf192';
    console.log(this.user);

      this.driver.eps = this.driver.eps;
      this.driver.arl = this.driver.arl;

    console.log(this.driver);

    this._userService.addUser(this.token, this.user).subscribe(
      response => {
        if (!response.user) {
          this.alertMessage = 'Error en el servidor';
        }else{

          this.user = response.user;

              console.log('ooy');

              this.driver.user = this.user._id;

              console.log(this.driver);
              this._driverService.addDriver(this.token, this.driver).subscribe(
                response => {
                  if(!response.driver){
                    this.alertMessage = 'Error en el servidor';
                  }else{
                    this.alertMessage = '¡El usuario conductor fue creado correctamente!';
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
