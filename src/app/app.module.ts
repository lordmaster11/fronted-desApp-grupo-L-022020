import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './User/register/register.component';
import { EditComponent } from './User/edit/edit.component';
import { LoginComponent } from './User/login/login.component';
import { ListarComponent } from './User/listar/listar.component';
import{FormsModule}from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';

import{HttpClientModule}from '@angular/common/http';
import { ListComponent } from './Project/list/list.component';
import { ProjectService } from './Service/project.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { FooterComponent } from './Footer/footer/footer.component';
import { ProfileComponent } from './User/profile/profile.component';
import { DonationsComponent } from './User/donations/donations.component';
import { CreateProjectComponent } from './Project/create-project/create-project.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    EditComponent,
    LoginComponent,
    ListarComponent,
    ListComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    DonationsComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [UserService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
