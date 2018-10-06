import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Rol } from '../models/rol';

@Injectable()
export class RolService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getRol(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'rol/'+id, options)
                     .map(res => res.json());
  }

  getRolList(token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'roles-list/', options)
                     .map(res => res.json());
  }

  addRol(token, rol: Rol) {
    let params = JSON.stringify(rol);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'rol', params, { headers: headers })
                     .map(res => res.json());

  }

  editRol(token, id:string, rol: Rol){
    let params = JSON.stringify(rol);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'rol/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteRol(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'rol/'+id, options)
                     .map(res => res.json());
  }



}
