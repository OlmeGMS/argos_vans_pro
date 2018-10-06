import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-sildebar',
  templateUrl: './sildebar.component.html',
  styleUrls: ['./sildebar.component.css'],
  providers: [UserService]
})
export class SildebarComponent implements OnInit {

  public user: User;
  public identity;
  public token;
  public url: string;
  public alertMessage;


  constructor(
    private _userService: UserService
  ) {
    this.user = new User('','','','','','','','','', true);
    //
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    console.log('o');
    console.log(this.identity);
    this.user = this.identity;
    console.log(this.user);
  }


  logout(){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      localStorage.clear();
      this.identity = null;
      this.token = null;
  }

  onSubmit(){
    console.log(this.user.password);
    this._userService.updatePassword(this.user).subscribe(
      response => {
        if (!response.user) {
            this.alertMessage = 'No se pudo actualizar el password';
        }else{
            this.alertMessage = '¡¡¡ Cambio de contraseña exitoso !!!';
            this.user = response.user;
            console.log(this.user);
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
        }
      }
    );
  }

}
