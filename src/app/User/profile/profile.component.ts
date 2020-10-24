import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users: User[];
  user :User=new User();
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.service.getUsers()
    .subscribe(data => {
      this.users = data;
    });
  }

  Editar(user:User):void{
    localStorage.setItem("id",user.id.toString());
    this.router.navigate(["edit"]);
  }

  irAEdit(){
    this.router.navigate(["edit"]);
  }
}
