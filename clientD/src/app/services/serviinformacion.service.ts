import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiInformacionService{
  public identity;
  public token;
  public tokenServi;
  public url: string;

  constructor(private _http: Http){
    this.url = 'https://sitidata-stdr.appspot.com/api/outobjmassive';
    this.tokenServi = 'Token PTMHPF0T4JS1KPQJ7NQYWJNCSRJJ8H';

  }

  getServiLocalidad(info: string){
      let params = JSON.stringify(info);
      console.log(params);
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': this.tokenServi
      });

      return this._http.post(this.url, params, {headers: headers})
                       .map(res => res.json());
  }
}
