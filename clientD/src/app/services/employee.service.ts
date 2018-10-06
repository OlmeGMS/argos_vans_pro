import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { Employee } from '../models/employee';

@Injectable()
export class EmployeeService{
  public identity;
  public token;
  public employee;
  public user;
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  getEmployee(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'employee/'+id, options)
                     .map(res => res.json());
  }

  getEmployeeListAdmin(token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'employee-list-admin/', options)
                     .map(res => res.json());
  }

  getEmployeeList(token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'employee-list/', options)
                     .map(res => res.json());
  }

  addEmployee(token, employee: Employee) {
    let params = JSON.stringify(employee);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'employee', params, { headers: headers })
                     .map(res => res.json());

  }

  editEmployee(token, id:string, employee: Employee){
    let params = JSON.stringify(employee);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'employee/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteEmployee(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'employee/'+id, options)
                     .map(res => res.json());
  }

  onFalseEmployee(token, id:string, employee: Employee){
    let params = JSON.stringify(employee);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'employee-status/'+id, params, {headers: headers})
                     .map(res => res.json());

  }

}
