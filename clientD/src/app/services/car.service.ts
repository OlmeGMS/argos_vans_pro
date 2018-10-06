import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Car } from '../models/car';

@Injectable()
export class CarService{
  public identity;
  public token;
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  getCar(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url+'car/'+id, options)
                     .map(res => res.json());

  }

  getCarList(token){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url+'cars-list/', options)
                     .map(res => res.json());
  }

  searchCar(token, placa: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers});
    return this._http.get(this.url+'cars-search/'+placa, options)
                      .map(res => res.json());
  }

  addCar(token, car:Car){
    let params = JSON.stringify(car);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url+'car', params, {headers: headers})
                     .map(res => res.json());
  }

  editCar(token, id:string, car:Car){
    let params = JSON.stringify(car);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'car/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteCar(token, id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({ headers: headers});
    return this._http.delete(this.url+'car/'+id, options)
                     .map(res => res.json());
  }
}
