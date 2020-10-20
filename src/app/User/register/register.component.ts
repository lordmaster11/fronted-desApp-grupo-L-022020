import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User=new User();
  constructor(private router:Router, private service:UserService) { }

  ngOnInit() {
  }

  Guardar(){
    this.service.createUser(this.user)
    .subscribe(data=>{
      alert("Se Agrego con Exito...!!!");
      this.router.navigate(["listar"]);
    })
  }

}
