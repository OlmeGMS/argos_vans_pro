import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { CostCenter } from '../models/costCenter';

@Injectable()
export class CostCenterService {
  public url: string;

  constructor(private _http: Http) {
      this.url = GLOBAL.url;
  }

  getCostCenter(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url+'cost-center/'+id, options)
                     .map(res => res.json());
  }

  getCostCenterList(token){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url + 'cost-center-list/', options)
                     .map(res => res.json());
  }

  addCostCenter(token, costCenter: CostCenter){
    let params = JSON.stringify(costCenter);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.post(this.url+'cost-center', params, { headers: headers })
                     .map(res => res.json());
  }

  editCostCenter(token, id:string, costCenter: CostCenter){
    let params = JSON.stringify(costCenter);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    return this._http.put(this.url+'cost-center/'+id, params, {headers: headers})
                     .map(res => res.json());

  }

  deleteCostCenter(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'cost-center/'+id, options)
                     .map(res => res.json());
  }


}
