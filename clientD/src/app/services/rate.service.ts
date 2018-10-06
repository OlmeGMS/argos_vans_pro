import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Rate } from '../models/rate';
import { Location } from '../models/location';

@Injectable()
export class RateService{
  public identity;
  public token;
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  getRate(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url+'rate/'+id, options)
                     .map(res => res.json());

  }

  getRateList(token){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url+'rates-list/', options)
                     .map(res => res.json());
  }

  searchLocation(token, city: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url+'location-search/'+city, options)
                      .map(res => res.json());
  }

  addRate(token, rate:Rate){
    let params = JSON.stringify(rate);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'rate', params, {headers: headers})
                     .map(res => res.json());
  }

  editRate(token, id:string, rate:Rate){
    let params = JSON.stringify(rate);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'rate/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteRate(token, id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.delete(this.url+'rate/'+id, options)
                     .map(res => res.json());
  }
}
