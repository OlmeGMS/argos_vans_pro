import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { EmployeeService } from '../services/employee.service';
import { TemplateService } from '../services/template.service';
import { Template } from '../models/template';
import { AppComponent } from '../app.component';

@Component({
  selector: 'template-table',
  templateUrl: '../views/template-table.html',
  providers: [UserService, EmployeeService, TemplateService]
})

export class TemplateTableComponent implements OnInit{

  public titulo: string;
  public templates: Template[];
  public identity;
  public token;
  public url: string;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _templateService: TemplateService
  ){
    this.titulo = 'Planilla';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
      console.log('cargado el componente de tabla de planilla');
      this.getTempalteList();
  }

  getTempalteList(){
    this._templateService.getTemplateList(this.token).subscribe(
      response => {
        console.log(response);
        if(!response.templates){
          this._router.navigate(['/']);
        }else{
          this.templates = response.templates;
          console.log(this.templates);
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

  onCancelTemplate(){
    this.confirmado = null;
  }

  onDeleteTemplate(id){
    this._templateService.deleteTemplate(this.token, id).subscribe(
      response => {
        if (!response.rol){
          alert('Planilla eliminada');
        }
        this.getTempalteList();
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
