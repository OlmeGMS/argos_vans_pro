import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { DriverCarService } from '../services/driverCar.service';
import { DriverCar} from '../models/driver_car';
import { AppComponent } from '../app.component';

@Component({
  selector: 'drivercar-table',
  templateUrl: '../views/divercar-table.html',
  providers: [UserService, DriverCarService]
})

export class DriverCarTableComponent implements OnInit{

  public titulo: string;
  public driverCars: DriverCar[];
  public driverCar: DriverCar;
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _driverCarService: DriverCarService
  ){
    this.titulo = 'Prestadores del servicio';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
      console.log('cargado el componente de tabla de Prestadores del servicio');
      this.getDriverCarList();
  }

  getDriverCarList(){
    this._driverCarService.getDriverCarList(this.token).subscribe(
      response => {
        console.log(response);
        if(!response.driverCars){
          this._router.navigate(['/']);
        }else{
          this.driverCars = response.driverCars;
          console.log(this.driverCars);
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

  onCancelDriverCar(){
    this.confirmado = null;
  }

  onDeleteDriverCar(id){
    this._driverCarService.deleteDriverCar(this.token, id).subscribe(
      response => {
        if (!response.rol){
          alert('¡Prestador eliminado!');
        }
        this.getDriverCarList();
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

  onFalseDriverCar(id){

    this._driverCarService.getDriverCar(this.token, id).subscribe(
        response => {
          if(!response.driverCar){
            this._router.navigate(['/']);
          }else{
            this.driverCar = response.driverCar;
            this.driverCar.status = false;
            this._driverCarService.onFalseDriverCar(this.token, id, this.driverCar).subscribe(
              response => {
                if (!response.rol){
                  alert('Empleado eliminado');
                }
                this.getDriverCarList();
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
