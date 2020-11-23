import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private user: UserService, 
              private location: Location, 
              private translate: TranslateService,
              private router: Router,
              public auth: AuthService,
              @Inject(DOCUMENT) private doc: Document) { 
    translate.addLangs(['es', 'en']);    
    translate.setDefaultLang('es');
  } 

  public app_name: string = 'Conectar Argentina';
  public isLogged: boolean = false;

  ngOnInit() {
  }

  goBack() {
    this.location.back()  
  }

  exitUser(){
    
    this.auth.logout({ returnTo: this.doc.location.origin });

  //  this.user.hide();
 //   localStorage.setItem("id","-1"); 
 //   localStorage.setItem("role", "ROLE_USER"); 
    
    //localStorage.removeItem('id');
   // localStorage.removeItem('role');

   // this.router.navigate(['login']);
  } 

  useLanguage(language: string){
    this.translate.use(language);
  }

  loginWithRedirect(): void {
    this.auth.loginWithPopup();
  }
  loginWithRedirectSignup(): void {
    this.auth.loginWithPopup({ screen_hint: 'signup' });
  }
}