import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { DriverService } from '../services/driver.service';
import { Driver } from '../models/driver';
import { AppComponent } from '../app.component';

@Component({
  selector: 'driver-table-admin',
  templateUrl: '../views/driver-table.html',
  providers: [UserService, DriverService]
})


export class DriverTableAdminComponent implements OnInit{

  public titulo: string;
  public drivers: Driver[];
  public driver:  Driver;
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _driverService: DriverService
  ){
    this.titulo = 'Conductores';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.driver = new Driver('', '', '', false);
  }

  ngOnInit(){
    this.getDriverListAdmin();
  }

  getDriverListAdmin(){
    this._driverService.getDriverListAdmin(this.token).subscribe(
      response => {
        if(!response.drivers){
          this._router.navigate(['/']);
        }else{
          this.drivers = response.drivers;
          console.log(this.drivers);
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
  onFalseConfirm(id){
    this.confirmado = id;
  }

  onCancelDriver(){
    this.confirmado = null;
  }

  onDeleteDriver(id){
    this._driverService.deleteDriver(this.token, id).subscribe(
      response => {
        if (!response.rol){
          alert('Conductor eliminado');
        }
        this.getDriverListAdmin();
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



  onFalseEmployee(id){

    this._driverService.getDriver(this.token, id).subscribe(
        response => {
          if(!response.driver){
            this._router.navigate(['/']);
          }else{
            this.driver = response.driver;
            this.driver.status = false;
            this._driverService.onFalseDriver(this.token, id, this.driver).subscribe(
              response => {
                if (!response.rol){
                  alert('Conductor eliminado');
                }
                this.getDriverListAdmin();
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
        },
        error => {
          var errorMessage = <any>error;
           if(errorMessage != null){
             var body = JSON.parse(error._body);
             console.log(error);
           }
        }
    );



  }

}
