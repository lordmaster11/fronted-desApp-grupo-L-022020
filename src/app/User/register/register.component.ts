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

  user: User=new User();

  message:any;

  constructor(private router:Router, private service:UserService) { }

  ngOnInit() {
  }
  
  Registrar(){
    let resp=this.service.createUser(this.user);
    resp.subscribe((data)=>this.message=data);
    this.router.navigate(["listProject"]);
  }

/*
  register() {
    const user = { name: this.name, mail: this.mail, password: this.password, nick: this.name};
    this.service.createUser(user).subscribe(data => {
      console.log(data);
    });
  }


  Registrar(){
    this.service.createUser(this.user).subscribe(
      data =>{
        console.log("response recivida");
        this.router.navigate(["listar"]);
    },
    error => {
      console.log("exception");
    }
    )
  }


   Registrar(){
    this.service.createUser(0, this.user)
    .subscribe(data=>{
      alert("Se Agrego con Exito...!!!");
      this.router.navigate(["listar"]);
    })
  }*/
}
