import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Route } from '../models/route';


@Injectable()
export class RouteService {
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  getRoute(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url+'route/'+id, options)
                     .map(res => res.json());
  }

  getRouteList(token){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url + 'route-list/', options)
                     .map(res => res.json());
  }

  getRouteListActive(token){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url + 'route-list-active/', options)
                     .map(res => res.json());
  }

  getRouteListinActive(token){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url + 'route-list-inactive/', options)
                     .map(res => res.json());
  }

  addRoute(token, route: Route){
    let params = JSON.stringify(route);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'route', params, { headers: headers })
                     .map(res => res.json());
  }

  editRoute(token, id:string, route:Route){
    let params = JSON.stringify(route);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'route/'+id, params, {headers: headers})
                     .map(res => res.json());

  }

  deleteRoute(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers});
    return this._http.delete(this.url+'route/'+id, options)
               .map(res => res.json());
  }

  billRouteWeek(token, route: Route){
    let params = JSON.stringify(route);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'route-bill', params, { headers: headers })
                     .map(res => res.json());
  }

}
