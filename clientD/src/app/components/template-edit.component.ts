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
  selector: 'template-edit',
  templateUrl: '../views/template-edit.html',
    providers: [UserService, TemplateService, CostCenterService, ServiInformacionService, CityService]
})

export class TemplateEditComponent implements OnInit{

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
  public rellenador;
  public flecha;
  public info:any = {};
  public url: string;
  public alertMessage;
  public radar;
  public buscador:any = {};
  public cantLocalidad: number = 0;

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
    this.titulo = 'Editar planilla de recorrido';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.template = new Template('', '', '', '', '', '', '', '',  '','', '');
    this.getCostCenterList();
    this.getCityList();
    this.getCityListEnd();
    this.getTemplate();
    this.rellenador = this.template;

    console.log(this.rellenador);
    this.source = new LocalDataSource(this.rellenador);
    console.log(this.source);


  }



  ngOnInit(){
    console.log('cargado el componente crear planilla');
  }

  prueba(){
    this.rellenador = {
      dni:'4444',
      name: 'Nombre',
      surname: 'Apellido',
      phone: '444',
      address:'Dirección',
      costCenter: 'CC',
      hour:'Hora'

    }
    return this.rellenador;
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
          if (this.servi.localidad == "") {
              this.template.location_start = this.ciudad;
          }else{

              this.template.location_start = this.servi.localidad;
          }

            console.log(this.template.location_start);
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
          if (this.servi.localidad == "") {
              this.template.location_end = this.ciudad;
          }else{

              this.template.location_end = this.servi.localidad;
          }

          console.log(this.template.location_end);
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
    var cant = 0;
    var contador = 0;
    var flag = 'No';

    this.viajerosdata = new LocalDataSource(this.data);
    this.viajeros = this.viajerosdata.data;
    console.log(this.viajeros);
    console.log(this.viajeros[0].address);
    this.template.employee = this.viajeros;
    this.alertMessage = '¡Procesando ...!';


    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      if(this.template.location_start == ""){
        console.log('Vacio start');
        console.log(this.ciudadMira);
        this.direccionMira = this.viajeros[0].address;
        this.template.adress_start = this.viajeros[0].address;
        this.info = {
                      "row":[
                      {"ciudad":this.ciudadMira,"direccion":this.direccionMira,"identificador":"1"}
                    ]};
                    this._servinformacionService.getServiLocalidad(this.info).subscribe(
                      response => {
                        console.log(response);
                        if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
                            this.alertMessage = '¡No se pudo ubicar la dirección origen!';
                        }else{
                          this.servi = response.data[0];
                          console.log(this.servi);
                          this.template.location_start = this.servi.localidad;
                          for (var row in this.viajeros){

                            this.buscador = {
                                          "row":[
                                          {"ciudad":this.ciudadMira,"direccion":this.viajeros[row].address,"identificador":"1"}
                                        ]};
                                        this._servinformacionService.getServiLocalidad(this.buscador).subscribe(
                                          response => {
                                            contador++;
                                            if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
                                                this.alertMessage = '¡No se pudo ubicar la dirección origen!';
                                            }else{
                                              this.servi = response.data[0];
                                              console.log(this.servi);
                                              console.log(this.servi.localidad);
                                              if(this.template.location_start != this.servi.localidad){
                                                cant = cant + 1;
                                                this.cantLocalidad = this.cantLocalidad + 1;
                                                console.log('diferente');
                                                console.log(cant);

                                              }else{
                                                console.log('igual');
                                              }
                                            }
                                          },
                                          error =>{
                                            var errorMessage = <any>error;
                                            if (errorMessage != null) {
                                              var body = JSON.parse(error._body);
                                              console.log(error);
                                            }
                                          }
                                        );
                                      console.log(cant);

                                      flag = "Si";
                          }

                          setTimeout(() => {

                            console.log('olmecas');
                            console.log(cant);
                            this.cantLocalidad = cant;
                            this.template.canLocalidades = this.cantLocalidad.toString();
                            console.log(this.template);

                            this._templateService.editTemplate(this.token, id, this.template).subscribe(
                              response => {
                                if (!response.template) {
                                    this.alertMessage = '¡Error en el servidor!';
                                }else{
                                    this.alertMessage = '¡La planilla fue creada correctamente!';
                                    this.template = response.template;
                                    console.log(this.template);
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

                          }, 2000);








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

      }else if (this.template.location_end == "") {
        console.log('Vacio end');
        this.direccionMira = this.viajeros[0].address;
        this.template.address_end = this.viajeros[0].address;
        this.info = {
                      "row":[
                      {"ciudad":this.ciudadMiraEnd,"direccion":this.direccionMira,"identificador":"1"}
                    ]};
                    this._servinformacionService.getServiLocalidad(this.info).subscribe(
                      response => {
                        console.log(response);
                        if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
                            this.alertMessage = '¡No se pudo ubicar la dirección destino!';
                        }else{
                          this.servi = response.data[0];
                          console.log(this.servi);
                          this.template.location_end = this.servi.localidad;
                          for (var row in this.viajeros){

                            this.buscador = {
                                          "row":[
                                          {"ciudad":this.ciudadMira,"direccion":this.viajeros[row].address,"identificador":"1"}
                                        ]};
                                        this._servinformacionService.getServiLocalidad(this.buscador).subscribe(
                                          response => {
                                            contador++;
                                            console.log('contador');
                                            console.log(contador);
                                            if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
                                                this.alertMessage = '¡No se pudo ubicar la dirección origen!';
                                            }else{
                                              this.servi = response.data[0];
                                              console.log(this.servi);
                                              console.log(this.servi.localidad);
                                              console.log('comparacion');
                                              console.log(this.template.location_end,'/',this.servi.localidad)
                                              if(this.template.location_end != this.servi.localidad){
                                                cant = cant + 1;
                                                this.cantLocalidad = this.cantLocalidad + 1;
                                                console.log('diferente');
                                                console.log(cant);
                                              }else{
                                                console.log('igual');
                                              }
                                            }
                                          },
                                          error =>{
                                            var errorMessage = <any>error;
                                            if (errorMessage != null) {
                                              var body = JSON.parse(error._body);
                                              console.log(error);
                                            }
                                          }
                                        );
                                      console.log(cant);

                                      flag = "Si";
                          }

                            setTimeout(() => {

                              console.log('Marinpingüe');
                              console.log(cant);
                              this.cantLocalidad = cant;
                              this.template.canLocalidades = this.cantLocalidad.toString();
                              console.log(this.template);
                              this._templateService.editTemplate(this.token, id, this.template).subscribe(
                                response => {
                                  if (!response.template) {
                                      this.alertMessage = '¡Error en el servidor!';
                                  }else{
                                      this.alertMessage = '¡La planilla fue creada correctamente!';
                                      this.template = response.template;
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

                            }, 2000);

                            /*

                            */
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
    });
    /*
    if(this.template.location_start == ""){
      console.log('Vacio start');
      console.log(this.ciudadMira);
      this.direccionMira = this.viajeros[0].address;
      this.template.adress_start = this.viajeros[0].address;
      this.info = {
                    "row":[
                    {"ciudad":this.ciudadMira,"direccion":this.direccionMira,"identificador":"1"}
                  ]};
                  this._servinformacionService.getServiLocalidad(this.info).subscribe(
                    response => {
                      console.log(response);
                      if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
                          this.alertMessage = '¡No se pudo ubicar la dirección origen!';
                      }else{
                        this.servi = response.data[0];
                        console.log(this.servi);
                        this.template.location_start = this.servi.localidad;
                        this._templateService.addTemplate(this.token, this.template).subscribe(
                          response => {
                            if (!response.template) {
                                this.alertMessage = '¡Error en el servidor!';
                            }else{
                                this.alertMessage = '¡La planilla fue creada correctamente!';
                                this.template = response.template;
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
                         if (errorMessage != null) {
                           var body = JSON.parse(error._body);
                           console.log(error);
                         }
                    }
                  );

    }else if (this.template.location_end == "") {
      console.log('Vacio end');
      this.direccionMira = this.viajeros[0].address;
      this.template.address_end = this.viajeros[0].address;
      this.info = {
                    "row":[
                    {"ciudad":this.ciudadMiraEnd,"direccion":this.direccionMira,"identificador":"1"}
                  ]};
                  this._servinformacionService.getServiLocalidad(this.info).subscribe(
                    response => {
                      console.log(response);
                      if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
                          this.alertMessage = '¡No se pudo ubicar la dirección destino!';
                      }else{
                        this.servi = response.data[0];
                        console.log(this.servi);
                        this.template.location_end = this.servi.localidad;
                        this._templateService.addTemplate(this.token, this.template).subscribe(
                          response => {
                            if (!response.template) {
                                this.alertMessage = '¡Error en el servidor!';
                            }else{
                                this.alertMessage = '¡La planilla fue creada correctamente!';
                                this.template = response.template;
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
                         if (errorMessage != null) {
                           var body = JSON.parse(error._body);
                           console.log(error);
                         }
                    }
                  );



    }

    */


    console.log(this.template);

  }
}
