import { HttpErrorResponse } from '@angular/common/http';
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

  constructor(private router:Router, private service:UserService) { }

  user: User=new User();
  message:any;

  ngOnInit() {}
  
  Registrar(){
    let resp=this.service.createUser(this.user);
    resp.subscribe((response) => {
      localStorage.setItem("id",response.id.toString());
      this.router.navigate(['listProject']);
        },
        (error: HttpErrorResponse) => {
          alert("There was a problem logging you out");
        // Handle error
        });
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
