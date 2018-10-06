import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { Driver } from '../models/driver';

@Injectable()
export class DriverService{
  public identity;
  public token;
  public driver;
  public user;
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  getDriver(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'driver/'+id, options)
                     .map(res => res.json());
  }

  getDriverListAdmin(token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'driver-list-admin/', options)
                     .map(res => res.json());
  }

  getDriverList(token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'driver-list/', options)
                     .map(res => res.json());
  }

  addDriver(token, driver: Driver) {
    let params = JSON.stringify(driver);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'driver', params, { headers: headers })
                     .map(res => res.json());

  }

  editDriver(token, id:string, driver: Driver){
    let params = JSON.stringify(driver);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'driver/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteDriver(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'driver/'+id, options)
                     .map(res => res.json());
  }

  onFalseDriver(token, id:string, driver: Driver){
    let params = JSON.stringify(driver);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'driver-status/'+id, params, {headers: headers})
                     .map(res => res.json());

  }

}
