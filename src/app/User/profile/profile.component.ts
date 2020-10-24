import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(private activatedRoute: ActivatedRoute,
              private service: UserService, 
              private router: Router) { }

  user:User = new User();
 
  ngOnInit() {
    let id=Number(localStorage.getItem("id"));
    this.service.getUserId(id)
    .subscribe(response => {
      this.user = response;
    });
  }

  Editar(user:User):void{
    this.router.navigate(["edit"]);
  }
  
  returnHome():void{
    this.router.navigate(['listProject']);
  }

  irAEdit(){
    this.router.navigate(["edit"]);
  }

  myDonations():void{
    this.router.navigate(['donations']);
  }
}
