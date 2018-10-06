import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { TemplateService } from '../services/template.service';
import { RateService } from '../services/rate.service';
import { DriverCarService } from '../services/driverCar.service';
import { RouteService } from '../services/route.service';
import { LocationService } from '../services/location.service';
import { LocationAddService } from '../services/locationadd.service';
import { Template } from '../models/template';
import { Rate } from '../models/rate';
import { DriverCar } from '../models/driver_car';
import { Route } from '../models/route';
import { Location } from '../models/location';
import { LocationAdd } from '../models/locationAdd';
import { AppComponent } from '../app.component';;

@Component({
  selector: 'route-edit',
  templateUrl: '../views/route-edit.html',
  providers: [UserService, TemplateService, RateService, DriverCarService, RouteService, LocationAddService]
})

export class RouteEditComponent implements OnInit {

  public titulo: string;
  public templates: Template[];
  public template: Template;
  public rates: Rate[];
  public driverCars: DriverCar[];
  public route: Route;
  public locationAddPrice: LocationAdd;
  public localidadUno: Location;
  public localidadDos: Location;
  public locationOne;
  public locationTwo;
  public precioLocalidadAdd;
  public precio;
  public precioTotal;
  public identity;
  public token;
  public cantLocalidades;
  public suma;
  public url: string;
  public alertMessage;;


    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _templateService: TemplateService,
      private _rateService: RateService,
      private _driverCarService: DriverCarService,
      private _routeService: RouteService,
      private _locationAddService: LocationAddService,
      private _locationService: LocationService,
    ){
      this.titulo = 'Editar Ruta';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.route = new Route('', '', '', '', 'false', '', '', 'null','null',true);
      this.getRateList();
      this.getDriverCarList();
      this.getTempalteList();
      this.getLocationAdd();
      this.getRoute();
    }

    ngOnInit(){
      console.log('Cargado el componente de crear ruta');

    }

    getRoute(){
      this._route.params.forEach((params: Params) => {
        let id = params['id'];
        this._routeService.getRoute(this.token, id).subscribe(
            response => {
              if(!response.route){
                this._router.navigate(['/']);
              }else{
                this.route = response.route;
                console.log(this.route);
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

    getLocationAdd(){

        let id = '5baf8ab287653702b800ee9f';
        this._locationAddService.getLocationAdd(this.token, id).subscribe(
            response => {
              if(!response.locationAdd){
                this._router.navigate(['/']);
              }else{
                this.locationAddPrice = response.locationAdd;
                console.log(this.locationAddPrice);
                console.log(this.locationAddPrice.price);
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

    getTempalteList(){
      this._templateService.getTemplateList(this.token).subscribe(
        response => {
          console.log(response);
          if(!response.templates){
            this._router.navigate(['/']);
          }else{
            this.templates = response.templates;
            console.log(this.templates);
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
      console.log(this.route);
      this._route.params.forEach((params: Params) => {
        let id = params['id'];
          var flag = true;
          console.log(flag);

          this._templateService.getTemplate(this.token, this.route.template).subscribe(
              response => {
                if(!response.template){
                  this._router.navigate(['/']);
                }else{
                  this.template = response.template;
                  console.log(this.template);

                  console.log('il');

                  if(this.template.canLocalidades != "1"){
                    this._rateService.getRate(this.token, this.route.rate).subscribe(
                        response => {
                          if(!response.rate){
                            this._router.navigate(['/']);
                          }else{
                            this.precio = response.rate;
                            this.precioTotal = this.precio.precio;

                            this.cantLocalidades = this.template.canLocalidades;
                            this.precioLocalidadAdd = Number(this.locationAddPrice.price);
                            this.suma = this.cantLocalidades * this.precioLocalidadAdd;

                            this.precioTotal = this.precioTotal + this.suma;
                            this.route.price = this.precioTotal;
                            console.log(this.route.price);
                            console.log(this.route);

                            let idLocationOne = this.precio.origen;
                            this._locationService.getLocation(this.token, idLocationOne).subscribe(
                              response => {
                                if(!response.location){
                                  this._router.navigate(['/']);
                                }else{
                                  this.localidadUno = response.location;
                                  console.log(this.localidadUno);

                                  //id segunda localidad
                                  let idLocationTwo = this.precio.destino;
                                  this._locationService.getLocation(this.token, idLocationTwo).subscribe(
                                    response => {
                                      if(!response.location){
                                        this._router.navigate(['/']);
                                      }else{
                                        this.localidadDos = response.location;
                                        console.log(this.localidadDos);

                                        if (this.template.location_start == this.localidadUno.name && this.template.location_end == this.localidadDos.name) {
                                          this._routeService.editRoute(this.token, id, this.route).subscribe(
                                            response => {
                                              if(!response.route){
                                                this.alertMessage = 'Error en el servidor';
                                              }else{
                                                this.alertMessage = 'La ruta fue actualizada correctamente';
                                                this.route = response.route;
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
                                        }else if (this.template.location_end == this.localidadUno.name && this.template.location_start == this.localidadDos.name) {
                                          this._routeService.editRoute(this.token, id, this.route).subscribe(
                                            response => {
                                              if(!response.route){
                                                this.alertMessage = 'Error en el servidor';
                                              }else{
                                                this.alertMessage = 'La ruta fue actualizada correctamente';
                                                this.route = response.route;
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
                                        }else{
                                          this.alertMessage = 'La tarifa no concuerda la planilla';
                                        }


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
                        },
                        error => {
                          var errorMessage = <any>error;
                           if(errorMessage != null){
                             var body = JSON.parse(error._body);
                             console.log(error);
                           }
                        }
                    );


                  }else{
                    this._rateService.getRate(this.token, this.route.rate).subscribe(
                        response => {
                          if(!response.rate){
                            this._router.navigate(['/']);
                          }else{
                            this.precio = response.rate;
                            this.route.price = this.precio.precio;

                            //Validacion planilla-ruta



                                let idLocationOne = this.precio.origen;
                                this._locationService.getLocation(this.token, idLocationOne).subscribe(
                                  response => {
                                    if(!response.location){
                                      this._router.navigate(['/']);
                                    }else{
                                      this.localidadUno = response.location;
                                      //id segunda localidad
                                      let idLocationTwo = this.precio.destino;
                                      this._locationService.getLocation(this.token, idLocationTwo).subscribe(
                                        response => {
                                          if(!response.location){
                                            this._router.navigate(['/']);
                                          }else{
                                            this.localidadDos = response.location;
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
                                      // Editar ruta
                                      if (this.template.location_start == this.localidadUno.name && this.template.location_end == this.localidadDos.name) {
                                      this._routeService.editRoute(this.token, id, this.route).subscribe(
                                        response => {
                                          if(!response.route){
                                            this.alertMessage = 'Error en el servidor';
                                          }else{
                                            this.alertMessage = 'La ruta fue creada correctamente';
                                            this.route = response.route;
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
                                      }else if (this.template.location_end == this.localidadUno.name && this.template.location_start == this.localidadDos.name) {
                                        this._routeService.editRoute(this.token, id, this.route).subscribe(
                                          response => {
                                            if(!response.route){
                                              this.alertMessage = 'Error en el servidor';
                                            }else{
                                              this.alertMessage = 'La ruta fue creada correctamente';
                                              this.route = response.route;
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
                                      }else{
                                        this.alertMessage = 'La tarifa no concuerda la planilla';
                                      }
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
}
