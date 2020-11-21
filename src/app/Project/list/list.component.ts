import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, Routes, RouterModule, NavigationEnd} from '@angular/router';
import { ProjectService} from 'src/app/Service/project.service';
import { Project } from 'src/app/Model/Project';
import { BaseFormDonate } from 'src/app/Utils/base-form-donate';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/Model/User';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private modalService: NgbModal, 
              private service: ProjectService,
              private serviceUser:UserService,
              private router: Router,
              public donateForm: BaseFormDonate){}

  projects: Project[];
  project :Project=new Project();
  closeResult = '';
  navigation = this.router.getCurrentNavigation();
  user:User = new User();
  idUser =  Number(localStorage.getItem("id"));
  userDonor = true;
  points = "";
  
  displayedColumns: string[] = ['id', 'Nombre del Proyecto', 'Localidad', 'Provincia', 'Monto Acumulado', 'Porcentaje Acumulado', 'Donantes', 'Fecha de Fin', 'actions'];
  dataSource = new MatTableDataSource();
  volver = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    if(Number(localStorage.getItem("id")) == -1){
      this.router.navigate(['login']);
    }else{
      this.idUser = Number(localStorage.getItem("id"));
      this.userDonor = String(localStorage.getItem("role")) != "ROLE_ADMIN";
      this.Point();
      this.service.getProjects()
        .subscribe(data => {
          this.dataSource.data = data;
          this.projects = data;
        });
      }
  }

  ngOnDestroy(): void {
    this.donateForm.baseForm.reset();
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
  
  Donar(idProject:number){
    if (this.donateForm.baseForm.invalid) {
      return;
    }

    this.Point();
    const formValue = this.donateForm.baseForm.value;

    this.service.createDonation(this.idUser, idProject, formValue.montoDonado, formValue.comment)
    .subscribe(response => {
      this.ngOnInit();
        alert("Donación exitosa, gracias por su colaboración");
    },
      (error: HttpErrorResponse) => {
        alert("Hubo un problema con la donación vuelva a intentar"); //"Hubo un problema con la donación" + error.error.errors
          // Handle error
      });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  closeProject(project:Project){
    this.service.closeProject(project.id)
    .subscribe(data=>{
      this.ngOnInit();
      this.router.navigate(["listProject"]);
    })
  }

  onClickConfirm(project:Project){
    if (confirm('¿Esta seguro de cerrar el proyecto?')) {
      this.closeProject(project);
    }
  }

  getOpenProjects(){
    this.dataSource.data = this.projects.filter(x =>x.isOpen === true)
    this.volver = true;
  }

  return(){
    this.service.getProjects()
    .subscribe(data => {
      this.dataSource.data = data;
      this.projects = data;
      this.volver = false;
    })
  }

  checkField(field: string): boolean {
    return this.donateForm.isValidField(field);
  }
}