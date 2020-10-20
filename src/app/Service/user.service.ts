import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  Url='https://desappgrupol022020backend.herokuapp.com/api/users';

  getUsers(){
    return this.http.get<User[]>(this.Url);
  }

  createUser(user:User){
    return this.http.post<User>(this.Url+"/register",user);
  }

  getUserId(id:number){
    return this.http.get<User>(this.Url+"/"+id);
  }

  updateUser(user:User){
    return this.http.put<User>(this.Url+"/"+user.id,user);
  }

  deleteUser(user:User){
    return this.http.delete<User>(this.Url+"/"+user.id);
  }
}
