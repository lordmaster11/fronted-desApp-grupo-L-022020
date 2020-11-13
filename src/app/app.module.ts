import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './User/register/register.component';
import { EditComponent } from './User/edit/edit.component';
import { LoginComponent } from './User/login/login.component';
import { ListarComponent } from './User/listar/listar.component';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ListComponent } from './Project/list/list.component';
import { ProjectService } from './Service/project.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { FooterComponent } from './Footer/footer/footer.component';
import { ProfileComponent } from './User/profile/profile.component';
import { DonationsComponent } from './User/donations/donations.component';
import { CreateProjectComponent } from './Project/create-project/create-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

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
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [UserService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}