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
  ngOnInit(){}

  Login(){
    this.service.login(this.user).subscribe((response) => {
      localStorage.setItem("id",response.id.toString()); 
      localStorage.setItem("role",response.role.toString()); 
      this.router.navigate(['listProject']);
      },
      (error: HttpErrorResponse) => {
        alert("There was a problem logging you out");
      // Handle error
      });
  }
  
  Register(){
    this.router.navigate(["register"]);
  }
}