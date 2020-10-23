import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/app/Service/project.service';
import { Project } from 'src/app/Model/Project';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import  {MatCurrencyFormatModule} from 'mat-currency-format';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  projects: Project[];
  constructor(private activatedRoute: ActivatedRoute,
              private modalService: NgbModal, 
              private service: ProjectService, 
              private router: Router) { }
  closeResult = '';
  ngOnInit() {
    this.service.getProjects()
      .subscribe(data => {
        this.projects = data;
      });
  }
  Editar(project:Project):void{
    localStorage.setItem("id",project.id.toString());
    this.router.navigate(["editProject"]);
  }

  Delete(project:Project){
    this.service.deleteProject(project)
    .subscribe(data=>{
      this.projects=this.projects.filter(p=>p!==project);
      alert("Projecto eliminado...");
    })
  }
  
  Donar(idProject:number, montoADonar:number, comment:string){
    if(idProject== null || montoADonar == null || comment == null){
      alert("Must complete the fields");
    }else{
      let params: any = this.activatedRoute.snapshot.params;
      this.service.createDonation(params.id, idProject, montoADonar, comment)
      .subscribe(response => {
        alert("Successful donation, Thank you for collaborating");
          },
          (error: HttpErrorResponse) => {
          alert("There was a problem in Donation" + error.error.errors);
          // Handle error
          });
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
    });
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
}
