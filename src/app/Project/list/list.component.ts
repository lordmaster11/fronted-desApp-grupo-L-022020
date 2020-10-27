import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Routes, RouterModule, NavigationEnd} from '@angular/router';
import { ProjectService} from 'src/app/Service/project.service';
import { Project } from 'src/app/Model/Project';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import  {MatCurrencyFormatModule} from 'mat-currency-format';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/Service/user.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/User/login/login.component';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit  {
  
  constructor(private modalService: NgbModal, 
              private service: ProjectService,
              private serviceUser:UserService,
              private router: Router){}

  projects: Project[];
  project :Project=new Project();
  closeResult = '';
  navigation = this.router.getCurrentNavigation();
  user:User = new User();
  idUser =  Number(localStorage.getItem("id"));
  userDonor = true;
  points = "";
  
  ngOnInit() {
    
    if(Number(localStorage.getItem("id")) == -1){
      this.router.navigate(['login']);
    }else{
      this.idUser = Number(localStorage.getItem("id"));
      this.userDonor = String(localStorage.getItem("role")) != "ROLE_ADMIN";
      this.Point();
      this.service.getProjects()
        .subscribe(data => {
          this.projects = data;
        });
      }
  }
  Editar(project:Project):void{
    localStorage.setItem("id",project.id.toString());
    this.router.navigate(["editProject"]);
  }

  Delete(project:Project){
    this.service.deleteProject(project)
    .subscribe(data=>{
      this.projects=this.projects.filter(p=>p!==project);
      alert("Delete Project");
    })
  }
  
  Donar(idProject:number, montoADonar:number, comment:string){
    if(idProject== null || montoADonar == null || comment == null){
      alert("Debe ingresar todos los datos");
    }else{
      this.Point();
      this.service.createDonation(this.idUser, idProject, montoADonar, comment)
      .subscribe(response => {
        this.ngOnInit();
        alert("Donación exitosa, gracias por su colaboración");
          },
          (error: HttpErrorResponse) => {
          alert("Hubo un problema con la donación" + error.error.errors);
          // Handle error
          });
    }
  }
  
  Point(){
    this.serviceUser.getUserId(this.idUser)
    .subscribe(response => {
        this.points = response.points + "";
    })
  }

  UpdateProject(project:Project){
    this.service.updateProject(project)
    .subscribe(data=>{
      this.project=data;
      this.router.navigate(["listProject"]);
    })
  }

  open(content) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => { });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      //return `with: ${reason}`;
    }
  }

  ProfileUser(){
   // localStorage.setItem("id",this.idUser.toString());
    //this.router.navigateByUrl('/profile', { state: { id: this.idUser } }); 
    this.router.navigate(["profile"]);
  }
  creteProject(){
    this.router.navigate(["createProject"]);
  }
}