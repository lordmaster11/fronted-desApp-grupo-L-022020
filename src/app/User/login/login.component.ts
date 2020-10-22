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

  user: User=new User();
  message:any;

  constructor(private router:Router,private service:UserService) { }

  ngOnInit() {
  }
  
  Login(){
    this.service.login(this.user).subscribe((response) => {
        this.router.navigate(["listProject"]);
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