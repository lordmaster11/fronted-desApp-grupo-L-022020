import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private location: Location, private translate: TranslateService) { 
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

  useLanguage(language: string){
    this.translate.use(language);
  }
}