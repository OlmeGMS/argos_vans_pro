import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { RolService } from './services/rol.service';
import { Rol } from './models/rol';
import { User } from './models/user';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, RolService]
})
export class AppComponent implements OnInit{
  public title = 'Celuvans';
  public user: User;
  public rol;
  public identity;
  public token;
  public errorMessage;
  public myDate = Date.now();
  public url: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _rolService: RolService
  ) {
    this.user = new User('','','','','','','','','',true);

  }

  ngOnInit(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.rol = this._userService.getRol();


      console.log(this.identity);
      console.log(this.token);
      console.log(this.identity.rol._id);
      console.log(this.identity.rol.name);
  }


  public onSubmit(){
      console.log(this.user);
      this._userService.signup(this.user).subscribe(
        response => {
            let identity = response.user;
            this.identity = identity;

            if(!this.identity._id){
              alert('El usuario no está correctamente indentificado');
            }else{
              // Crear elemento en ele localstorage para tener al usuario sesión
                localStorage.setItem('identity', JSON.stringify(identity));
              // Conseguir el token para enviarlo a cada petición http
              this._userService.signup(this.user, 'true').subscribe(
                response => {

                    let token = response.token;
                    this.token = token;

                    if(this.token.length <= 0){
                      alert('El token no se ha generado correctamente');
                    }else{
                      // Crear elemento en el localstorage para tener el token
                      localStorage.setItem('token', token);
                      this._router.navigate(['index.html']);
                      this.user = new User('','','','','','','','','', true);


                    }
                },
                error => {
                  var errorMessage = <any>error;
                  if (errorMessage != null) {
                      var body = JSON.parse(error._body);
                      this.errorMessage = body.message;
                      console.log(error);
                  }
                }
              );
            }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
              var body = JSON.parse(error._body);
              this.errorMessage = body.message;
              console.log(error);
          }
        }
      );
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }



}
