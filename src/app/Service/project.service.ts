import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Project } from '../Model/Project';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  Url='https://desappgrupol022020backend.herokuapp.com/api/projects';

  getProjects(){
    return this.http.get<Project[]>(this.Url);
  }

  createProject(project:Project){
    return this.http.post<Project>(this.Url+"/register",project);
  }

  getProjectId(id:number){
    return this.http.get<Project>(this.Url+"/"+id);
  }

  updateProject(project:Project){
    return this.http.put<Project>(this.Url+"/"+project.id,project);
  }

  deleteProject(project:Project){
    return this.http.delete<Project>(this.Url+"/"+project.id);
  }

  createDonation(userId:number, projectId:number, amount:number, comment:string): Observable<any>{
    return this.http.post<any>("https://desappgrupol022020backend.herokuapp.com/api/donation?"+
                                "userId="+userId+
                                "&projectId="+projectId+
                                "&amount="+amount+
                                "&comment="+comment, 
                                this.httpOptions);       
  }
}