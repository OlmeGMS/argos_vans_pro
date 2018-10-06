import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { City } from '../models/city';

@Injectable()
export class CityService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
      this.url = GLOBAL.url;
    }

    getCity(token, id: string){
        let headers = new Headers({
          'Content-Type':'application/json',
          'Authorization': token
        });

        let options = new RequestOptions({ headers: headers});
        return this._http.get(this.url+'city/'+id, options)
                         .map(res => res.json());
    }

    getCityList(token){
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.get(this.url+'cities-list/', options)
                       .map(res => res.json());
    }

    addCity(token, city:City){
      let params = JSON.stringify(city);
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      return this._http.post(this.url+'city', params, {headers: headers})
                       .map(res => res.json());
    }

    editCity(token, id:string, city: City){
      let params = JSON.stringify(city);
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': token
      });

      return this._http.put(this.url+'city/'+id, params, {headers: headers})
                       .map(res => res.json());
    }

    deleteCity(token, id:string){
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.delete(this.url+'city/'+id, options)
                       .map(res => res.json());
    }





}
