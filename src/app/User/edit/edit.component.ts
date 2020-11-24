import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private router:Router, private service:UserService){}
              
  user:User=new User();

  ngOnInit() {
    this.Editar();
  }

  Editar(){
    let id=localStorage.getItem("id");
    this.service.getUserId(+id)
    .subscribe(data=>{
      this.user=data;
    })
  }

  Actualizar2(user:User){
    this.service.updateUser(user)
    .subscribe(data=>{
      this.user=data;
      alert("El usuario se actualizó correctamente!!!");
      this.router.navigateByUrl('/listProject'); 
    })
  }

  returnView(user:User){
    this.router.navigateByUrl('/profile');    
  }
}
