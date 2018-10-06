import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { DriverCar } from '../models/driver_car';

@Injectable()
export class DriverCarService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
      this.url = GLOBAL.url;
    }

    getDriverCar(token, id: string){
        let headers = new Headers({
          'Content-Type':'application/json',
          'Authorization': token
        });

        let options = new RequestOptions({ headers: headers});
        return this._http.get(this.url+'driver-car/'+id, options)
                         .map(res => res.json());
    }

    getDriverListAdmin(token) {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      let options = new RequestOptions({ headers: headers });
      return this._http.get(this.url + 'driver-car-list-admin/', options)
                       .map(res => res.json());
    }

    getDriverCarList(token){
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.get(this.url+'driver-car-list/', options)
                       .map(res => res.json());
    }

    addDriverCar(token, driverCar:DriverCar){
      let params = JSON.stringify(driverCar);
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      return this._http.post(this.url+'driver-car', params, {headers: headers})
                       .map(res => res.json());
    }

    editDriverCar(token, id:string, driverCar: DriverCar){
      let params = JSON.stringify(driverCar);
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': token
      });

      return this._http.put(this.url+'driverCar/'+id, params, {headers: headers})
                       .map(res => res.json());
    }

    deleteDriverCar(token, id:string){
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.delete(this.url+'driver-car/'+id, options)
                       .map(res => res.json());
    }

    onFalseDriverCar(token, id:string, driverCar: DriverCar){
      let params = JSON.stringify(driverCar);
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': token
      });

      return this._http.put(this.url+'driver-car-status/'+id, params, {headers: headers})
                       .map(res => res.json());

    }





}
