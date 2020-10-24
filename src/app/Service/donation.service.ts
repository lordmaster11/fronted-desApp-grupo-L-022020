import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DonationService {
 
  constructor(private http:HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  Url='https://desappgrupol022020backend.herokuapp.com/api/';

  getDonationUserId(id: number) {
    return this.http.get<any>(this.Url+"donationsUser/"+id);
  }
}
