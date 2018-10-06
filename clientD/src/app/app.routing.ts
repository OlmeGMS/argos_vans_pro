import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import user
import { HomeComponent } from './components/home.component';
import { UserTableComponent } from './components/user-table.component';
import { UserAddComponent } from './components/user-add.component';
import { UserEditComponent } from './components/user-edit.component';

// import roles
import { RolListComponent } from './components/rol-list.component';
import { RolAddComponent } from './components/rol-add.component';
import { RolEditComponent } from './components/rol-edit.component';

// import cities
import { CityTableComponent } from './components/city-table.component';
import { CityAddComponent } from './components/city-add.component';
import { CityEditComponent } from './components/city-edit.component';

// import Location
import { LocationTableComponent } from './components/location-table.component';
import { LocationAddComponent } from './components/location-add.component';
import { LocationEditComponent } from './components/location-edit.component';

// import costCenter
import { CostCenterTableComponent } from './components/cost-center-table.component';
import { CostCenterAddComponent } from './components/cost-center-add.component';

// import car
import { CarAddComponent } from './components/car-add.component';
import { CarTableComponent } from './components/car-table.component';
import { CarEditComponent } from './components/car-edit.component';

// import rate
import { RateTableComponent } from './components/rate-table.component';
import { RateAddComponent } from './components/rate-add.component';
import { RateEditComponent } from './components/rate-edit.component';

// import employee
import { EmployeeTableAdminComponent } from './components/employee-table-admin.component';
import { EmployeeTableComponent } from './components/employee-table.component';
import { EmployeeAddComponent } from './components/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit.component';
import { EmployeeDatilComponent } from './components/employee-detail.component';

// import arl
import { ArlTableComponent } from './components/arl-table.component';
import { ArlAddComponent } from './components/arl-add.component';
import { ArlEditComponent } from './components/arl-edit.component';

// import eps
import { EpsTableComponent } from './components/eps-table.component';
import { EpsAddComponent } from './components/eps-add.component';
import { EpsEditComponent } from './components/eps-edit.component';

// import driver
import { DriverTableAdminComponent } from './components/driver-table-admin.component';
import { DriverTableComponent } from './components/driver-table.component';
import { DriverAddComponent } from './components/driver-add.component';
import { DriverEditComponent } from './components/driver-edit.component';
import { DriverDetailComponent } from './components/driver-detail.component';

// import driverCar
import { DriverCarTableComponent } from './components/driverCar-table.component';
import { DriverCarAddComponent } from './components/dirverCar-add.component';
import { DriverCarEditComponent } from './components/driverCar-edit.component';

//import template
import { TemplateTableComponent } from './components/template-table.component';
import { TemplateAddComponent } from './components/template-add.component';
import { TemplateEditComponent } from './components/template-edit.component';
import { TemplateDetailComponent } from './components/template-detail.component';

// import route
import { RouteTableComponent } from './components/route-table.component';
import { RouteAddComponent } from './components/route-add.component';
import { RouteEditComponent } from './components/route-edit.component';
import { RouteDetailComponent } from './components/route-detail.component';
import { RouteManageComponent } from './components/route-manage.component';
import { RouteTableActiveComponent } from './components/route-active.component';
import { RouteTableInactiveComponent } from './components/route-inactive.component';
import { RouteBillComponent } from './components/route-bill.component';

//import  locationAdd;
import { LocationAddTableComponent } from './components/locationadd-table.component';
import { LocationAddAddComponent } from './components/locationadd-add.component';
import { LocationAddEditComponent } from './components/locationadd-edit.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: 'usuarios', component: UserTableComponent},
  {path: 'crear-usuario', component: UserAddComponent},
  {path: 'empleados-admin', component: EmployeeTableAdminComponent},
  {path: 'empleados', component: EmployeeTableComponent},
  {path: 'crear-empleado', component: EmployeeAddComponent},
  {path: 'editar-empleado/:id', component: EmployeeEditComponent},
  {path: 'ver-empleado/:id', component: EmployeeDatilComponent},
  {path: 'roles', component: RolListComponent},
  {path: 'crear-rol', component: RolAddComponent},
  {path: 'editar-rol/:id', component: RolEditComponent},
  {path: 'ciudades', component: CityTableComponent},
  {path: 'crear-ciudad', component: CityAddComponent},
  {path: 'editar-ciudad/:id', component: CityEditComponent},
  {path: 'localidades', component: LocationTableComponent},
  {path: 'crear-localidad', component: LocationAddComponent},
  {path: 'editar-localidad/:id', component: LocationEditComponent},
  {path: 'centros', component: CostCenterTableComponent},
  {path: 'crear-centro', component: CostCenterAddComponent},
  {path: 'vehiculos', component: CarTableComponent},
  {path: 'crear-vehiculo', component: CarAddComponent},
  {path: 'editar-vehiculo/:id', component: CarEditComponent},
  {path: 'tarifas', component: RateTableComponent},
  {path: 'crear-tarifa', component: RateAddComponent},
  {path: 'editar-tarifa/:id', component: RateEditComponent},
  {path: 'arls', component: ArlTableComponent},
  {path: 'crear-arl', component: ArlAddComponent},
  {path: 'editar-arl/:id', component: ArlEditComponent},
  {path: 'eps', component: EpsTableComponent},
  {path: 'crear-eps', component: EpsAddComponent},
  {path: 'editar-eps/:id', component: EpsEditComponent},
  {path: 'conductores-admin', component: DriverTableAdminComponent},
  {path: 'conductores', component: DriverTableComponent},
  {path: 'crear-conductor', component: DriverAddComponent},
  {path: 'editar-conductor/:id', component: DriverEditComponent},
  {path: 'ver-conductor/:id', component: DriverDetailComponent},
  {path: 'prestadores', component: DriverCarTableComponent},
  {path: 'crear-prestador', component: DriverCarAddComponent},
  {path: 'editar-prestador/:id', component: DriverCarEditComponent},
  {path: 'planillas', component: TemplateTableComponent},
  {path: 'crear-planilla', component: TemplateAddComponent},
  {path: 'editar-planilla/:id', component: TemplateEditComponent},
  {path: 'ver-planilla/:id', component: TemplateDetailComponent},
  {path: 'rutas', component: RouteTableComponent},
  {path: 'crear-ruta', component: RouteAddComponent},
  {path: 'editar-ruta/:id', component: RouteEditComponent},
  {path: 'ver-ruta/:id', component: RouteDetailComponent},
  {path: 'gestionar-ruta/:id', component: RouteManageComponent},
  {path: 'rutas-programadas', component: RouteTableActiveComponent},
  {path: 'rutas-finalizadas', component: RouteTableInactiveComponent},
  {path: 'ruta-factura', component: RouteBillComponent},
  {path: 'precio-localidad-adicionales', component: LocationAddTableComponent},
  {path: 'crear-precio-localidad-adicional', component: LocationAddAddComponent},
  {path: 'editar-precio-localidad-adicional/:id', component: LocationAddEditComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
