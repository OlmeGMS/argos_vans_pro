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
  selector: 'template-add',
  templateUrl: '../views/template-add.html',
  providers: [UserService, TemplateService, CostCenterService, ServiInformacionService, CityService]
})

export class TemplateAddComponent implements OnInit {

  public titulo: string;
  public template: Template;
  public costCenters: CostCenter[];
  public cities: City[];
  public citiesEnd: City[];
  public identity;
  public cheto;
  public token;
  public ciudad;
  public direccion;
  public servi;
  public viajerosdata;
  public viajeros;
  public reclutador =[];
  public identificador;
  public ciudadMira;
  public ciudadMiraEnd;
  public direccionMira;
  public radar;
  public vv: any = [];
  public tropel = [];
  public info: any = {};
  public buscador: any = {};
  public buscadorfinal: any = {};
  public url: string;
  public alertMessage;
  public paso;
  public cantLocalidad: number = 0;

  settings = {
    columns: {
      dni: {
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
      address: {
        title: 'Dirección'
      },
      costCenter: {
        title: 'CC'
      },
      hour: {
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
  ) {
    this.titulo = 'Crear planilla de recorrido';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.template = new Template('', '', '', '', '', '', '', '', '', '', '');
    this.getCostCenterList();
    this.getCityList();
    this.getCityListEnd();

  }

  ngOnInit() {
    console.log('cargado el componente crear planilla');
  }

  final() {
    this.viajerosdata = new LocalDataSource(this.data);
    this.viajeros = this.viajerosdata.data;
    console.log(this.viajeros);
  }

  getCostCenterList() {
    this._costCenterService.getCostCenterList(this.token).subscribe(
      response => {
        console.log(response);
        if (!response.costCenter) {
          this._router.navigate(['/']);
        } else {
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

  getCityListEnd() {
    this._cityService.getCityList(this.token).subscribe(
      response => {
        if (!response.cities) {
          this._router.navigate(['/']);
        } else {
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

  getCityList() {
    this._cityService.getCityList(this.token).subscribe(
      response => {
        if (!response.cities) {
          this._router.navigate(['/']);
        } else {
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

  searchUser(dni) {
    console.log(dni);
  }

  cityOrigen(city) {
    this.ciudadMira = city;
    console.log(this.ciudadMira);
  }

  cityEnd(city) {
    this.ciudadMiraEnd = city;
    console.log(this.ciudadMiraEnd);
  }

  searchLocation(city, address) {
    console.log(city);
    console.log(address);
    this.ciudad = city;
    this.direccion = address;
    this.identificador = "1";

    //this.info = [{"ciudad":this.ciudad, "direccion":this.direccion, "identificador":this.identificador}];
    this.info = {
      "row": [
        { "ciudad": this.ciudad, "direccion": this.direccion, "identificador": "1" }
      ]
    };



    console.log(this.info);
    this._servinformacionService.getServiLocalidad(this.info).subscribe(
      response => {
        console.log(response);
        if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
          this.alertMessage = '¡No se pudo ubicar la dirección!';
        } else {
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

  searchLocation_end(city, address) {
    console.log(address);
    this.ciudad = city;
    this.direccion = address;
    this.identificador = "1";

    //this.info = [{"ciudad":this.ciudad, "direccion":this.direccion, "identificador":this.identificador}];
    this.info = {
      "row": [
        { "ciudad": this.ciudad, "direccion": this.direccion, "identificador": "1" }
      ]
};



    console.log(this.info);
    this._servinformacionService.getServiLocalidad(this.info).subscribe(
      response => {
        console.log(response);
        if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
          this.alertMessage = '¡No se pudo ubicar la dirección!';
        } else {
          this.servi = response.data[0];
          console.log(this.servi);
          this.alertMessage = '¡Dirección ubicada!';
          console.log(this.servi.localidad);
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


  onSubmit() {
    var cant = 0;
    var contador = 0;
    var flag = 'No';
    let bebe: any = [];
    var yupy: any = [];
    var tetero;
    this.viajerosdata = new LocalDataSource(this.data);
    this.viajeros = this.viajerosdata.data;
    console.log(this.viajeros);
    console.log(this.viajeros[0].address);
    console.log(this.viajeros.length);

    this.alertMessage = '¡Procesando ...!';

    //prueba
    /*
    this.direccionMira = this.viajeros[0].address;
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
          console.log(this.template.location_start);
          for (var row in this.viajeros){
            this.buscador = {
                          "row":[
                          {"ciudad":this.ciudadMira,"direccion":this.viajeros[row].address,"identificador":"1"}
                        ]};
                        this._servinformacionService.getServiLocalidad(this.buscador).subscribe(
                          response => {
                            if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
                                this.alertMessage = '¡No se pudo ubicar la dirección origen!';
                            }else{
                              this.servi = response.data[0];
                              console.log(this.servi);
                              console.log(this.servi.localidad);
                              if(this.template.location_start != this.servi.localidad){
                                cant++;
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
          }

          console.log('termino bucle');
          console.log(cant);

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
*/
    //fusion

    let promesa = new Promise((resolve, reject) => {

      if (this.template.location_start == "") {
        console.log('Vacio start');
        console.log(this.ciudadMira);
        this.direccionMira = this.viajeros[0].address;
        console.log(this.direccionMira);
        this.template.adress_start = this.viajeros[0].address;
        this.info = {
          "row": [
            { "ciudad": this.ciudadMira, "direccion": this.direccionMira, "identificador": "1" }
          ]
        };
        this._servinformacionService.getServiLocalidad(this.info).subscribe(
          response => {
            console.log(response);
            if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
              this.alertMessage = '¡No se pudo ubicar la dirección origen!';
            } else {
              this.servi = response.data[0];
              console.log(this.servi);
              if (this.servi.localidad != null || this.servi.localidad != "") {
                  this.template.location_start = this.servi.localidad;
              }else{
                this.template.location_start = this.ciudadMira;
              }

              for (var row in this.viajeros) {
                bebe = this.viajeros[row];
                console.log(bebe);
                console.log(row);
                this.buscador = {
                  "row": [
                    { "ciudad": this.ciudadMira, "direccion": this.viajeros[row].address, "identificador": "1" }
                  ]
                };

                this._servinformacionService.getServiLocalidad(this.buscador).subscribe(
                  response => {
                    contador++;
                    if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
                      this.alertMessage = '¡No se pudo ubicar la dirección origen!';
                    } else {
                      this.servi = response.data[0];
                      console.log(this.servi);
                      console.log(this.servi.localidad);

                      if (this.template.location_start != this.servi.localidad) {
                        cant = cant + 1;
                        this.cantLocalidad = this.cantLocalidad + 1;
                        console.log('diferente');
                        console.log(cant);

                      } else {
                        console.log('igual');
                      }
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
                console.log(cant);

                bebe.localidad = this.servi.localidad;
                tetero = bebe;
                console.log(tetero);
                yupy.push(tetero);
                console.log(yupy);

                flag = "Si";
              }

              setTimeout(() => {

                console.log('olmecas');
                console.log(cant);
                this.cantLocalidad = cant;
                this.template.employee = yupy;
                this.template.canLocalidades = this.cantLocalidad.toString();
                console.log(this.template);

                this._templateService.addTemplate(this.token, this.template).subscribe(
                  response => {
                    if (!response.template) {
                      this.alertMessage = '¡Error en el servidor!';
                    } else {
                      this.alertMessage = '¡La planilla fue creada correctamente!';
                      this.template = response.template;
                      console.log(this.template);
                      resolve(this.template);
                    }
                  },
                  error => {
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                      var body = JSON.parse(error._body);
                      this.alertMessage = this.alertMessage = '¡Error: !' + body.message;
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

      } else if (this.template.location_end == "") {
        console.log('Vacio end');
        this.direccionMira = this.viajeros[0].address;
        this.template.address_end = this.viajeros[0].address;
        this.info = {
          "row": [
            { "ciudad": this.ciudadMiraEnd, "direccion": this.direccionMira, "identificador": "1" }
          ]
        };
        this._servinformacionService.getServiLocalidad(this.info).subscribe(
          response => {
            console.log(response);
            if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
              this.alertMessage = '¡No se pudo ubicar la dirección destino!';
            } else {
              this.servi = response.data[0];
              console.log(this.servi);
              console.log(this.servi.localidad);
              if (this.servi.localidad != null || this.servi.localidad != "") {
                  this.template.location_end = this.servi.localidad;
              }else{
                this.template.location_end = this.ciudadMira;
              }
              //this.template.location_end = this.servi.localidad;

                //quite el for

                //quite el setTimeout

                for (var row in this.viajeros) {


                    bebe = this.viajeros[row];
                    console.log(bebe);
                    console.log(row);
                    this.buscador = {
                      "row": [
                        { "ciudad": this.ciudadMira, "direccion": this.viajeros[row].address, "identificador": "1" }
                      ]
                    };

                    this._servinformacionService.getServiLocalidad(this.buscador).subscribe(
                      response => {
                        contador++;
                        console.log('contador');
                        console.log(contador);
                        if (response.success != true || Object.entries(response.data).length === 0 || response.data[0].barrio === "") {
                          this.alertMessage = '¡No se pudo ubicar la dirección origen!';
                        } else {
                          this.servi = response.data[0];
                          console.log(this.servi);
                          console.log(this.servi.localidad);
                          console.log('comparacion');
                          console.log(this.template.location_end, '/', this.servi.localidad);

                          this.viajeros[row].localidad = this.servi.localidad;
                          console.log(this.viajeros[row]);

                          if (this.template.location_end != this.servi.localidad) {
                            cant = cant + 1;
                            this.cantLocalidad = this.cantLocalidad + 1;
                            console.log('diferente');
                            console.log(cant);

                            this.reclutador.push(this.servi.localidad);
                            console.log(this.reclutador);
                          } else {
                            console.log('igual');


                          }
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






                        console.log(this.vv);

                        //bebe.localidad = this.paso;
                        //bebe.localidad = this.vv[row];
                        bebe.localidad = this.servi.localidad;
                        tetero = bebe;
                        console.log(tetero);

                        yupy.push(tetero);
                        console.log(yupy);
                        console.log(this.viajeros);
                        flag = "Si";
                }


                console.log(this.viajeros),

                //prueba setTimeout
                setTimeout(() => {
                  console.log(this.viajeros);
                  console.log(yupy);
                  console.log(this.reclutador);
                  this.template.employee = yupy;
                  console.log('Marinpingüe');
                  console.log(cant);
                  this.cantLocalidad = cant;
                  this.template.canLocalidades = this.cantLocalidad.toString();
                  console.log(this.template);


                  this._templateService.addTemplate(this.token, this.template).subscribe(
                    response => {
                      if (!response.template) {
                        this.alertMessage = '¡Error en el servidor!';
                      } else {
                        this.alertMessage = '¡La planilla fue creada correctamente!';
                        this.template = response.template;
                        resolve(this.template);
                      }
                    },
                    error => {
                      var errorMessage = <any>error;
                      if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        this.alertMessage = this.alertMessage = '¡Error: !' + body.message;
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

        // prueba for





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

    //console.log(this.template);

  }
}
