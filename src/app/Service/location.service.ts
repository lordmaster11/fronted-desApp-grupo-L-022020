import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  Url='https://desappgrupol022020backend.herokuapp.com/api/locations';

  getLocations(){
    return this.http.get<Location[]>(this.Url);
  }
  getLocationsPossible(){
    return this.http.get<Location[]>(this.Url +"Possible");
  }
}
