import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { LocationAdd } from '../models/locationAdd';

@Injectable()
export class LocationAddService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
      this.url = GLOBAL.url;
    }

    getLocationAdd(token, id: string){
        let headers = new Headers({
          'Content-Type':'application/json',
          'Authorization': token
        });

        let options = new RequestOptions({ headers: headers});
        return this._http.get(this.url+'location-add/'+id, options)
                         .map(res => res.json());
    }

    getLocationAddList(token){
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.get(this.url+'location-add-list/', options)
                       .map(res => res.json());
    }

    addLocationAdd(token, locationadd:LocationAdd){
      let params = JSON.stringify(locationadd);
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      return this._http.post(this.url+'location-add', params, {headers: headers})
                       .map(res => res.json());
    }

    editLocationAdd(token, id:string, locationadd: LocationAdd){
      let params = JSON.stringify(locationadd);
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': token
      });

      return this._http.put(this.url+'location-add/'+id, params, {headers: headers})
                       .map(res => res.json());
    }

    deleteLocationAdd(token, id:string){
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.delete(this.url+'location-add/'+id, options)
                       .map(res => res.json());
    }





}
