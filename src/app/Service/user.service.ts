import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { User } from '../Model/User';
import { Location } from '../Model/Location';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }
  
  Url='https://desappgrupol022020backend.herokuapp.com';

  getUsers(){
    return this.http.get<User[]>(this.Url+'/api/users');
  }

  createUser(user:User): Observable<any>{
    return this.http.post<any>(this.Url+'/api/users/register?name='+user.name+
                                                            '&mail='+user.mail+
                                                            '&password='+user.password+
                                                            '&nick='+user.nick , 
                                    this.httpOptions);
  }

  login(user:User): Observable<any>{
    return this.http.post<any>(this.Url+'/api/users/login?mail='+user.mail+
                                                            '&password='+user.password, 
                                    this.httpOptions);
  }
  getUserId(id:number){
    return this.http.get<User>(this.Url+'/api/users/'+id);
  }

  updateUser(user:User){
    return this.http.put<User>(this.Url+'/api/users/'+user.id+
                                        '?name='+user.name+
                                        '&password='+user.password+
                                        '&nick='+user.nick+
                                        '&role='+user.role
                                        ,user);
  }

  deleteUser(user:User){
    return this.http.delete<User>(this.Url+'/api/users/'+user.id, this.httpOptions);
  }

  getUsers2(){
    return this.http.get<Location[]>('https://desappgrupol022020backend.herokuapp.com/api/locations');
  }

  createUser2(location:Location){
    return this.http.post<Location>('https://desappgrupol022020backend.herokuapp.com/api/location',location, this.httpOptions);
  }
}
