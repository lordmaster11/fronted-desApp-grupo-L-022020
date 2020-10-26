import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desAppGrupoL022020Frontend';

  constructor(private router:Router) {  }
/*
  Login(){
    this.router.navigate(["login"]);
  }

  Register(){
    this.router.navigate(["register"]);
  }
*/
  Listar(){
    this.router.navigate(["listar"]);
  }
/*
  ListProject(){
    this.router.navigate(["listProject"]);
  }*/
}
