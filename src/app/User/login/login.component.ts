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
    this.router.navigate(["listProject"]);
  }
  
  Register(){
    this.router.navigate(["register"]);
  }
}