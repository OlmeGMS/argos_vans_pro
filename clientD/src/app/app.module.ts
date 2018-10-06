import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

//Plugins
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DatatablesProductsComponent } from './datatables-products/datatables-products.component';

// Webapp
import { AppComponent } from './app.component';
import { SildebarComponent } from './sildebar/sildebar.component';
import { TemplateHeaderComponent } from './template-header/template-header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './components/home.component';
import { UserTableComponent } from './components/user-table.component';
import { UserAddComponent } from './components/user-add.component';
import { UserEditComponent } from './components/user-edit.component';
import { RolListComponent } from './components/rol-list.component';
import { RolAddComponent } from './components/rol-add.component';
import { RolEditComponent } from './components/rol-edit.component';
import { CityTableComponent } from './components/city-table.component';
import { CityAddComponent } from './components/city-add.component';
import { CityEditComponent } from './components/city-edit.component';
import { LocationTableComponent } from './components/location-table.component';
import { LocationAddComponent } from './components/location-add.component';
import { LocationEditComponent } from './components/location-edit.component';
import { CostCenterTableComponent } from './components/cost-center-table.component';
import { CostCenterAddComponent } from './components/cost-center-add.component';
import { CarAddComponent } from './components/car-add.component';
import { CarTableComponent } from './components/car-table.component';
import { CarEditComponent } from './components/car-edit.component';
import { RateTableComponent } from './components/rate-table.component';
import { RateAddComponent } from './components/rate-add.component';
import { RateEditComponent } from './components/rate-edit.component';
import { EmployeeAddComponent } from './components/employee-add.component';
import { EmployeeTableComponent } from './components/employee-table.component';
import { EmployeeTableAdminComponent } from './components/employee-table-admin.component';
import { EmployeeEditComponent } from './components/employee-edit.component';
import { EmployeeDatilComponent } from './components/employee-detail.component';
import { ArlTableComponent } from './components/arl-table.component';
import { ArlAddComponent } from './components/arl-add.component';
import { ArlEditComponent } from './components/arl-edit.component';
import { EpsTableComponent } from './components/eps-table.component';
import { EpsAddComponent } from './components/eps-add.component';
import { EpsEditComponent } from './components/eps-edit.component';
import { DriverTableAdminComponent } from './components/driver-table-admin.component';
import { DriverTableComponent } from './components/driver-table.component';
import { DriverAddComponent } from './components/driver-add.component';
import { DriverEditComponent } from './components/driver-edit.component';
import { DriverDetailComponent } from './components/driver-detail.component';
import { DriverCarTableComponent } from './components/driverCar-table.component';
import { DriverCarAddComponent } from './components/dirverCar-add.component';
import { DriverCarEditComponent } from './components/driverCar-edit.component';
import { TemplateTableComponent } from './components/template-table.component';
import { TemplateAddComponent } from './components/template-add.component';
import { TemplateEditComponent } from './components/template-edit.component';
import { TemplateDetailComponent } from './components/template-detail.component';
import { RouteTableComponent } from './components/route-table.component';
import { RouteAddComponent } from './components/route-add.component';
import { RouteEditComponent } from './components/route-edit.component';
import { RouteDetailComponent } from './components/route-detail.component';
import { RouteManageComponent } from './components/route-manage.component';
import { RouteTableActiveComponent } from './components/route-active.component';
import { RouteTableInactiveComponent } from './components/route-inactive.component';
import { RouteBillComponent } from './components/route-bill.component';
import { LocationAddTableComponent } from './components/locationadd-table.component';
import { LocationAddAddComponent } from './components/locationadd-add.component';
import { LocationAddEditComponent } from './components/locationadd-edit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SildebarComponent,
    TemplateHeaderComponent,
    FooterComponent,
    HomeComponent,
    UserTableComponent,
    UserAddComponent,
    UserEditComponent,
    RolListComponent,
    RolAddComponent,
    RolEditComponent,
    CityTableComponent,
    CityAddComponent,
    CityEditComponent,
    LocationTableComponent,
    LocationAddComponent,
    LocationEditComponent,
    CostCenterTableComponent,
    CostCenterAddComponent,
    CarAddComponent,
    CarTableComponent,
    CarEditComponent,
    RateTableComponent,
    RateAddComponent,
    RateEditComponent,
    EmployeeAddComponent,
    EmployeeTableComponent,
    EmployeeTableAdminComponent,
    EmployeeEditComponent,
    EmployeeDatilComponent,
    ArlTableComponent,
    ArlAddComponent,
    ArlEditComponent,
    EpsTableComponent,
    EpsAddComponent,
    EpsEditComponent,
    DriverTableAdminComponent,
    DriverTableComponent,
    DriverAddComponent,
    DriverEditComponent,
    DriverDetailComponent,
    DriverCarTableComponent,
    DriverCarAddComponent,
    DriverCarEditComponent,
    TemplateTableComponent,
    TemplateAddComponent,
    DatatablesProductsComponent,
    TemplateEditComponent,
    TemplateDetailComponent,
    RouteTableComponent,
    RouteAddComponent,
    RouteEditComponent,
    RouteDetailComponent,
    RouteManageComponent,
    RouteTableActiveComponent,
    RouteTableInactiveComponent,
    RouteBillComponent,
    LocationAddTableComponent,
    LocationAddAddComponent,
    LocationAddEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SmartTableModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
