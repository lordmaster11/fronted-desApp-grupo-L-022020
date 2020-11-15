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

  createProject(locationProjectId:number, factor:number, percentageRequiredForClosing:number, fantasyName:string){
    return this.http.post<any>("https://desappgrupol022020backend.herokuapp.com/api/newProject?"+
                                "locationProjectId="+locationProjectId+
                                "&factor="+factor+
                                "&percentageRequiredForClosing="+percentageRequiredForClosing+
                                "&fantasyName="+fantasyName,
                                this.httpOptions);    
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

  closeProject(projectId:number): Observable<any>{
    return this.http.put<any>("https://desappgrupol022020backend.herokuapp.com/api/closeProject/"+projectId, 
                                this.httpOptions);       
  }
}