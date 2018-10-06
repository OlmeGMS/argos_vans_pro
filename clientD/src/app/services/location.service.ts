import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Location } from '../models/location';

@Injectable()
export class LocationService {
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  getLocation(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url+'location/'+id, options)
                     .map(res => res.json());
  }

  getLocationList(token){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url + 'locations-list/', options)
                     .map(res => res.json());
  }

  addLocation(token, location: Location){
    let params = JSON.stringify(location);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'location', params, { headers: headers })
                     .map(res => res.json());
  }

  editLocation(token, id:string, location:Location){
    let params = JSON.stringify(location);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'location/'+id, params, {headers: headers})
                     .map(res => res.json());

  }

  deleteLocation(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers});
    return this._http.delete(this.url+'location/'+id, options)
               .map(res => res.json());
  }

}
