import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

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

declare const $;
type AOA = any[][];

@Component({
  selector: 'route-bill',
  templateUrl: '../views/route-bill.html',
  providers: [UserService, TemplateService, RateService, DriverCarService, RouteService]
})

export class RouteBillComponent implements OnInit {

    @ViewChild('content') content: ElementRef;

    public titulo: string;
    public templates: Template[];
    public rates: Rate[];
    public driverCars: DriverCar[];
    public route: Route;
    public routes: Route[];
    public precio;
    public precioTotal;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    //excel
    public data: AOA = [];
    public wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    public fileName: string = 'Facturacion.xlsx';

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _templateService: TemplateService,
      private _rateService: RateService,
      private _driverCarService: DriverCarService,
      private _routeService: RouteService
    ){
      this.titulo = 'Buscar';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.route = new Route('', '', '', '', 'false', '', '', 'null','null',true);
      this.getRateList();
      this.getDriverCarList();
      this.getTempalteList();
    }

    ngOnInit(){
      console.log('Cargado el componente de crear ruta');
      $(function() {
        $('#table-usuarios-app').DataTable({
          dom: 'Bfrtip',
          buttons: [
            'copy', 'csv', 'excel', 'pdf'
          ]
        });
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
        this._routeService.billRouteWeek(this.token, this.route).subscribe(
          response => {
            if (!response.routes) {
                this.alertMessage = '¡Error en el servidor!';
            }else{
                this.routes = response.routes;
                console.log(this.routes);
            }
          },
          error =>{
            var errorMessage = <any>error;
             if(errorMessage != null){
               var body = JSON.parse(error._body);
               this.alertMessage = body.message;
               console.log(error);
             }
          }
        );
    }

    exportExcel(dll, ruta){
      console.log('olme');
      var route: any;
      var rg: any;

      var datos;
      var empleado;
      var nombre;
      var apellido;
      var cedula;
      var telefono;
      var direccion;
      var fecha;
      var fechaPrestacion;
      var localidadOrigen;
      var ciudad;
      var hh;
      var ceco;
      var cc;
      var destino;
      var localidadDestino;
      var ruta;
      var tipoSer;
      var placa;
      var conductor;
      var telefonoCon;
      var km;
      var nPasajeros;
      var costo;

      this.data.push(['Fecha', 'Fecha Prestacion', 'Id Empleado', 'Empleado', 'Dirección origen', 'Localidad Origen', 'Ciudad', 'HH', 'Ceco', 'Centro de Costo', 'Destino', 'Localidad', 'Ruta', 'Tipo servicio', 'Placa', 'Conductor', 'Teléfono', 'Km',
                      'Nº Pasajeros', 'Costo']);
      for( var row in dll){
        rg = dll[row].template.employee;
        route = dll[row];
        for(var propiedad in rg){
          fecha = route.template.date_start;
          fechaPrestacion = route.date;
          cedula = rg[propiedad].dni;
          empleado = rg[propiedad].name, rg[propiedad].surname;
          direccion = rg[propiedad].address;
          localidadOrigen = route.rate.origen.name;
          ciudad = route.rate.origen.id_city.name;
          hh = rg[propiedad].hour;
          ceco = route.template.ceco;
          cc = route.template.cost_center.name;
          destino = route.rate.destino.name;
          localidadDestino = route.rate.destino.name;
          ruta = route.name;
          tipoSer = "Puerta a puerta";
          placa = route.driverCar.car.placa;
          conductor = route.driverCar.driver.user.name, route.driverCar.driver.user.surname;
          telefonoCon = route.driverCar.driver.user.phone;
          km = route.km;
          nPasajeros = route.template.employee.length;
          costo = route.price;
          this.data.push([fecha, fechaPrestacion, cedula, empleado, direccion, localidadOrigen, ciudad, hh, ceco, cc, destino, localidadDestino,
                          ruta, tipoSer, placa, conductor, telefonoCon, km, nPasajeros, costo]);
        }
      }


      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rg);
      /* generate worksheet */
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, ruta);

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }

    public downloadPDF() {
      let doc = new jsPDF();

      let specialElementHandlers = {
        '#editor': function(element, renderer) {
          return true;
        }
      };

      let content = this.content.nativeElement;

      doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 190,
        'elementHandlers': specialElementHandlers
      });

      doc.save('ruta.pdf');
    }

}
