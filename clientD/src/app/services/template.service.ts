import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { Template } from '../models/template';

@Injectable()
export class TemplateService{
  public identity;
  public token;
  public template;
  public user;
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  getTemplate(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'template/'+id, options)
                     .map(res => res.json());
  }


  getTemplateList(token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'template-list/', options)
                     .map(res => res.json());
  }

  addTemplate(token, template: Template) {
    let params = JSON.stringify(template);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'template', params, { headers: headers })
                     .map(res => res.json());

  }

  editTemplate(token, id:string, template: Template){
    let params = JSON.stringify(template);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'template/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteTemplate(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'template/'+id, options)
                     .map(res => res.json());
  }


}
