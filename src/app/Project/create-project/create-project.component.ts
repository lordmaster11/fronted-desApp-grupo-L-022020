import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { LocationService } from 'src/app/Service/location.service';
import { ProjectService } from 'src/app/Service/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(private router:Router,
              private service:ProjectService,
              private serviceLocation:LocationService){}

  project = new Project;
  locations: Location[];
  idProject: any;
  selectedLevel;
  
  ngOnInit(): void {
    this.serviceLocation.getLocationsPossible()
      .subscribe(data => {
        this.locations = data;
      });
    }

  Registrar(){
    if(this.idProject == null){
      alert("Debe seleccionar una localidad");
    }else{
      let resp = this.service.createProject(this.idProject,this.project.factor,
                            this.project.percentageRequiredForClosing,this.project.fantasyName);
      resp.subscribe((response) => {
        this.router.navigate(['listProject']);
          },
          (error: HttpErrorResponse) => {
            alert(error.error.errors);
          });
      }
    }

  selected(item:any){
    this.idProject = item.target.value
  }
}
