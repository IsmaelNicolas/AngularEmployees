import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';

const routes: Routes = [
  {path: '',redirectTo: 'viewEployees', pathMatch:'full'},
  {path:'viewEmployees' , component: ListEmployeesComponent},
  {path:'employee' , component: CreateEmployeeComponent},
  {path:'employee/:id' , component: CreateEmployeeComponent},
  {path: '**' , redirectTo:'viewEmployees',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
