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

  user :User=new User();
  constructor(private router:Router,private service:UserService) { }

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
  Actualizar(user:User){
    this.service.updateUser(user)
    .subscribe(data=>{
      this.user=data;
      alert("Se Actualizo con Exito...!!!");
      this.router.navigate(["listar"]);
    })
  }

}
