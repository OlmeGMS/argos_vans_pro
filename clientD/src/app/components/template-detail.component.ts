import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { TemplateService } from '../services/template.service';
import { CostCenterService } from '../services/costCenter.service';
import { CityService } from '../services/city.service';
import { ServiInformacionService } from '../services/serviinformacion.service';
import { Template } from '../models/template';
import { CostCenter } from '../models/costCenter';
import { City } from '../models/city';
import { AppComponent } from '../app.component';

@Component({
  selector: 'template-detail',
  templateUrl: '../views/template-detail.html',
    providers: [UserService, TemplateService, CostCenterService, ServiInformacionService, CityService]
})

export class TemplateDetailComponent implements OnInit{

  public titulo: string;
  public template: Template;
  public costCenters: CostCenter[];
  public cities: City[];
  public citiesEnd: City[];
  public identity;
  public token;
  public ciudad;
  public direccion;
  public servi;
  public viajerosdata;
  public viajeros;
  public identificador;
  public ciudadMira;
  public ciudadMiraEnd;
  public direccionMira;
  public info:any = {};
  public url: string;
  public alertMessage;

  settings = {
  columns: {
    dni:{
      title: 'Cedula'
    },
    name: {
      title: 'Nombre'
    },
    surname: {
      title: 'Apellido'
    },
    phone: {
      title: 'Teléfono'
    },
    address:{
      title: 'Dirección'
    },
    costCenter:{
      title: 'CC'
    },
    hour:{
      title: 'Hora'
    }

  }
};

data = [

];
source: LocalDataSource;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _templateService: TemplateService,
    private _costCenterService: CostCenterService,
    private _servinformacionService: ServiInformacionService,
    private _cityService: CityService
  ){
    this.titulo = 'Crear planilla de recorrido';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.template = new Template('', '', '', '', '', '', '', '',  '','', '');
    this.getCostCenterList();
    this.getCityList();
    this.getCityListEnd();
    this.getTemplate();
  }

  ngOnInit(){
    console.log('cargado el componente crear planilla');
  }

  getTemplate(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._templateService.getTemplate(this.token, id).subscribe(
          response => {
            if(!response.template){
              this._router.navigate(['/']);
            }else{
              this.template = response.template;
              console.log(this.template);
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

  final(){
    this.viajerosdata = new LocalDataSource(this.data);
    this.viajeros = this.viajerosdata.data;
    console.log(this.viajeros);
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

  getCityListEnd(){
    this._cityService.getCityList(this.token).subscribe(
      response => {
        if(!response.cities){
          this._router.navigate(['/']);
        }else{
          this.citiesEnd = response.cities;
          console.log(this.citiesEnd);
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

  getCityList(){
    this._cityService.getCityList(this.token).subscribe(
      response => {
        if(!response.cities){
          this._router.navigate(['/']);
        }else{
          this.cities = response.cities;
          console.log(this.cities);
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

  searchUser(dni){
    console.log(dni);
  }

  cityOrigen(city){
    this.ciudadMira = city;
    console.log(this.ciudadMira);
  }

  cityEnd(city){
    this.ciudadMiraEnd = city;
    console.log(this.ciudadMiraEnd);
  }

  searchLocation(city, address){
    console.log(city);
    console.log(address);
    this.ciudad = city;
    this.direccion = address;
    this.identificador = "1";

    //this.info = [{"ciudad":this.ciudad, "direccion":this.direccion, "identificador":this.identificador}];
    this.info = {
                  "row":[
                  {"ciudad":this.ciudad,"direccion":this.direccion,"identificador":"1"}
                ]};



    console.log(this.info);
    this._servinformacionService.getServiLocalidad(this.info).subscribe(
      response => {
        console.log(response);
        if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
            this.alertMessage = '¡No se pudo ubicar la dirección!';
        }else{
          this.servi = response.data[0];
          console.log(this.servi);
          this.alertMessage = '¡Dirección ubicada!';
          this.template.location_start = this.servi.localidad;
        }
      },
      error => {
        var errorMessage = <any>error;
           if (errorMessage != null) {
             var body = JSON.parse(error._body);
             this.alertMessage = '¡Error verifique los campos!';
             console.log(error);
           }
      }
    );


  }

  searchLocation_end(city, address){
    console.log(address);
    this.ciudad = city;
    this.direccion = address;
    this.identificador = "1";

    //this.info = [{"ciudad":this.ciudad, "direccion":this.direccion, "identificador":this.identificador}];
    this.info = {
                  "row":[
                  {"ciudad":this.ciudad,"direccion":this.direccion,"identificador":"1"}
                ]};



    console.log(this.info);
    this._servinformacionService.getServiLocalidad(this.info).subscribe(
      response => {
        console.log(response);
        if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
            this.alertMessage = '¡No se pudo ubicar la dirección!';
        }else{
          this.servi = response.data[0];
          console.log(this.servi);
          this.template.location_end = this.servi.localidad;
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


  onSubmit(){
      this._router.navigate(['/planillas']);
  }
}
