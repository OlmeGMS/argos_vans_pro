import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-home',
  templateUrl: '../views/home.html',
  providers: [UserService, AppComponent ]
})

export class HomeComponent implements OnInit{
  public titulo: string;
  public identity;
  public token;
  public url: string;
  public appComponent;
  public myDate;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _appComponent: AppComponent
  ){
    this.titulo = 'Examen';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(){
    console.log('home.component.ts cargado yuspy');
  }
}
