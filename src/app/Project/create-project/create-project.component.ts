import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { LocationService } from 'src/app/Service/location.service';
import { ProjectService } from 'src/app/Service/project.service';
import { BaseFormProject } from 'src/app/Utils/base-form-project';

@Component({
  selector: 'app-create',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit, OnDestroy {

  constructor(private router:Router,
              private service:ProjectService,
              private serviceLocation:LocationService,
              public projectForm: BaseFormProject){}

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

  ngOnDestroy(): void {
    this.projectForm.baseForm.reset();
  }

  Registrar(){
//    if(this.idProject == null){
//      alert("Debe seleccionar una localidad");
//    }else{

      if (this.projectForm.baseForm.invalid) {
        return;
      }
  
      const formValue = this.projectForm.baseForm.value;
      let resp = this.service.createProject(this.idProject, formValue.factor,
                            formValue.percentageRequiredForClosing,formValue.fantasyName);
      resp.subscribe((response) => {
        this.router.navigate(['listProject']);
          },
          (error: HttpErrorResponse) => {
            alert(error.error.errors);
          });
  //    }
    }

  selected(item:any){
    this.idProject = item.target.value
  }

  returnHome():void{
    this.router.navigate(['listProject']);
  }

  checkField(field: string): boolean {
    return this.projectForm.isValidField(field);
  }
}
