import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Eps } from '../models/eps';

@Injectable()
export class EpsService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
      this.url = GLOBAL.url;
    }

    getEps(token, id: string){
        let headers = new Headers({
          'Content-Type':'application/json',
          'Authorization': token
        });

        let options = new RequestOptions({ headers: headers});
        return this._http.get(this.url+'eps/'+id, options)
                         .map(res => res.json());
    }

    getEpsList(token){
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.get(this.url+'eps-list/', options)
                       .map(res => res.json());
    }

    addEps(token, eps:Eps){
      let params = JSON.stringify(eps);
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      return this._http.post(this.url+'eps', params, {headers: headers})
                       .map(res => res.json());
    }

    editEps(token, id:string, eps: Eps){
      let params = JSON.stringify(eps);
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': token
      });

      return this._http.put(this.url+'eps/'+id, params, {headers: headers})
                       .map(res => res.json());
    }

    deleteEps(token, id:string){
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.delete(this.url+'eps/'+id, options)
                       .map(res => res.json());
    }





}
