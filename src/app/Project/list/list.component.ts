import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/Service/project.service';
import { Project } from 'src/app/Model/Project';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  projects: Project[];
  constructor(private service: ProjectService, private router: Router) { }

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

}