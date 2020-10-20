import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './Project/list/list.component';
import { EditComponent } from './User/edit/edit.component';
import { ListarComponent } from './User/listar/listar.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';

const routes: Routes = [
  {path:'listar',component:ListarComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'edit',component:EditComponent},
  {path:'listProject',component:ListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
