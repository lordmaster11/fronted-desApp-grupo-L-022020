import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/Service/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private service:UserService) { }

  user: User=new User();
  message:any;

  ngOnInit() {}

  Registrar(){
    if(this.user.name== null || this.user.mail== null || this.user.nick== null || this.user.password== null){
      alert("Debe ingresar todos los datos");
    }else{
    let resp=this.service.createUser(this.user);
    resp.subscribe((response) => {
      this.service.show();
      localStorage.setItem("id",response.id.toString());
      localStorage.setItem("role", "ROLE_USER"); 
      this.router.navigate(['listProject']);
        },
        (error: HttpErrorResponse) => {
          alert("El usuario con el email: "+ this.user.mail + " ya existe!!!");
        // Handle error
        });
    }
  }
  


  //onSubmit() { this.submitted = true; }
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
