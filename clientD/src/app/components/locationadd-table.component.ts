import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { LocationAddService } from '../services/locationadd.service';
import { LocationAdd } from '../models/locationAdd'
import { AppComponent } from '../app.component';

@Component({
  selector: 'locationadd-table',
  templateUrl: '../views/locationadd-table.html',
  providers: [UserService, LocationAddService]
})

export class LocationAddTableComponent implements OnInit{

  public titulo: string;
  public locationAdds: LocationAdd[];
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _locationAddService: LocationAddService
  ){
    this.titulo = 'Precios';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
      console.log('cargado el componente de tabla de precio');
      this.getLocationAddList();
  }

  getLocationAddList(){
    this._locationAddService.getLocationAddList(this.token).subscribe(
      response => {
        if(!response.locationAdds){
          this._router.navigate(['/']);
        }else{
          this.locationAdds = response.locationAdds;
          console.log(this.locationAdds);
        }
      },
      error => {
        var errorMessage = <any>error;
           if (errorMessage != null) {
             var body = JSON.parse(error._body);
             //this.alertMessage = body.message;
             console.log(error);
           }
      }
    );
  }

  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelLocationAdd(){
    this.confirmado = null;
  }

  onDeleteLocationAdd(id){
    this._locationAddService.deleteLocationAdd(this.token, id).subscribe(
      response => {
        if (!response.rol){
          alert('Precio eliminado');
        }
        this.getLocationAddList();
      },
      error => {
        var errorMessage = <any>error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                //this.alertMessage = body.message;
                console.log(error);
            }
      }
    );
  }
}
