import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExcelService } from '../services/export.excel.service';

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
  selector: 'route-detail',
  templateUrl: '../views/route-detail.html',
  providers: [UserService, TemplateService, RateService, DriverCarService, RouteService]
})

export class RouteDetailComponent implements OnInit {


  @ViewChild('content') content: ElementRef;

  public titulo: string;
  public templates: Template[];
  public rates: Rate[];
  public driverCars: DriverCar[];
  public route: Route;
  public precio;
  public precioTotal;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public flecha;

  //excel
  public data: AOA = [];
  public wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  public fileName: string = 'Ruta.xlsx';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _templateService: TemplateService,
    private _rateService: RateService,
    private _driverCarService: DriverCarService,
    private _routeService: RouteService,
    private excelService: ExcelService
  ) {
    this.titulo = 'Ver Ruta';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.route = new Route('', '', '', '', 'false', '', '', 'null','null',true);

    this.getRoute();
    this.getRateList();
    this.getDriverCarList();
    this.getTempalteList();

  }

  ngOnInit() {
    console.log('Cargado el componente de crear ruta');
    $(function() {
      $('#example').DataTable({
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf'
        ]
      });
    });





  }

  getRoute() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._routeService.getRoute(this.token, id).subscribe(
        response => {
          if (!response.route) {
            this._router.navigate(['/']);
          } else {
            this.route = response.route;
            console.log(this.route);
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
    });

  }

  getRateList() {
    this._rateService.getRateList(this.token).subscribe(
      response => {
        if (!response.rates) {
          this._router.navigate(['/']);

        } else {
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

  getDriverCarList() {
    this._driverCarService.getDriverCarList(this.token).subscribe(
      response => {
        console.log(response);
        if (!response.driverCars) {
          this._router.navigate(['/']);
        } else {
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

  getTempalteList() {
    this._templateService.getTemplateList(this.token).subscribe(
      response => {
        console.log(response);
        if (!response.templates) {
          this._router.navigate(['/']);
        } else {
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


  onSubmit() {
    this._router.navigate(['/rutas']);

  }


  public downloadEXCEL() {
    console.log('Excel');
    this.excelService.generateExcel();
  }

  onFileChange(evt: any) {
    console.log('excel js');
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  exportExcel(data: any[]){
     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
     const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
     XLSX.writeFile(workbook, 'my_file.xls', { bookType: 'xls', type: 'buffer' });
  }

  export(template,ruta) {

    var rg = template;


    console.log(ruta);
    console.log(rg);
    //var datos = rg.join();
    var datos;
    var nombre;
    var apellido;
    var cedula;
    var telefono;
    var direccion;

    this.data.push(['Nombre', 'Apellido', 'Cédula', 'Teléfono', 'Dirección']);
    for (var propiedad in rg) {
      nombre = rg[propiedad].name;
      apellido = rg[propiedad].surname;
      cedula = rg[propiedad].dni;
      telefono = rg[propiedad].phone;
      direccion = rg[propiedad].address;
      this.data.push([nombre, apellido, cedula, telefono, direccion]);
    }
    console.log(rg);
    //this.data.push(['Nombre', 'Apellido', 'Cédula', 'Teléfono', 'Dirección'],[datos]);
    /*
    for (let i = 0; i < rg.length; i++) {
      console.log(this.flecha[i]);
      this.data.push(['Nombre', 'Apellido', 'Cédula', 'Teléfono', 'Dirección'],[this.flecha[i].name]);
    }
    */
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

  buttonExcel() {

    var wb = XLSX.utils.table_to_book(document.getElementById('example'));
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    $('#button-a').click(function() {
      //saveAs(new Blob([s2ab(wbout)],{type:"application/octest-stream"}), 'ruta.xlsx');
    });
  }

}
