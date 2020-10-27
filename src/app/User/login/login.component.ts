import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
              private service:UserService
              ){}
  
  user: User=new User();
  message:any;
  ngOnInit(){
    this.service.hide();
  }

  Login(){
    if(this.user.name!= null || this.user.password!= null){
    this.service.login(this.user).subscribe((response) => {
      localStorage.setItem("id",response.id.toString()); 
      localStorage.setItem("role",response.role.toString()); 
      this.service.show();
      this.router.navigate(['listProject']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message, "ERROR MESAGGE")
        console.log(error, "ERROR MESAGGE")
        alert("Ingreso mal los datos");
      // Handle error
      });
    }else{
      alert("Debe ingresar todos los datos");
    }
  }
  
  Register(){
    this.router.navigate(["register"]);
  }
}