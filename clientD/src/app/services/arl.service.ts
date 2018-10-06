import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Arl } from '../models/arl';

@Injectable()
export class ArlService{
    public identity;
    public token;
    public url: string;

    constructor(private _http: Http){
      this.url = GLOBAL.url;
    }

    getArl(token, id: string){
        let headers = new Headers({
          'Content-Type':'application/json',
          'Authorization': token
        });

        let options = new RequestOptions({ headers: headers});
        return this._http.get(this.url+'arl/'+id, options)
                         .map(res => res.json());
    }

    getArlList(token){
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.get(this.url+'arl-list/', options)
                       .map(res => res.json());
    }

    addArl(token, arl:Arl){
      let params = JSON.stringify(arl);
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      return this._http.post(this.url+'arl', params, {headers: headers})
                       .map(res => res.json());
    }

    editArl(token, id:string, arl: Arl){
      let params = JSON.stringify(arl);
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': token
      });

      return this._http.put(this.url+'arl/'+id, params, {headers: headers})
                       .map(res => res.json());
    }

    deleteArl(token, id:string){
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':token
      });
      let options = new RequestOptions({ headers: headers});
      return this._http.delete(this.url+'arl/'+id, options)
                       .map(res => res.json());
    }





}
