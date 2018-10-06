import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { TemplateService } from '../services/template.service';
import { RateService } from '../services/rate.service';
import { DriverCarService } from '../services/driverCar.service';
import { RouteService } from '../services/route.service';
import { Template } from '../models/template';
import { Rate } from '../models/rate';
import { DriverCar } from '../models/driver_car';
import { Route } from '../models/route';
import { AppComponent } from '../app.component';

@Component({
  selector: 'route-list',
  templateUrl: '../views/route-list-inactive.html',
  providers: [UserService, TemplateService, RateService, DriverCarService, RouteService]
})

export class RouteTableInactiveComponent implements OnInit {

  public titulo: string;
  public templates: Template[];
  public rates: Rate[];
  public drivercars: DriverCar[];
  public routes: Route[];
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _templateService: TemplateService,
    private _rateService: RateService,
    private _driverCarService: DriverCarService,
    private _routeService: RouteService
  ){
    this.titulo = 'Rutas finalizadas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('Componente de ruta-table-inactive cargado');
    this.getRouteList();
  }

  getRouteList(){
    this._routeService.getRouteListinActive(this.token).subscribe(
      response => {
        if (!response.routes) {
          this._router.navigate(['/']);
        }else{
          this.routes = response.routes;
          console.log(this.routes);
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


}
