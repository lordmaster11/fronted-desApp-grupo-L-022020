import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private location: Location) { } 
  public app_name: string = 'Conectar Argentina';
  public isLogged: boolean = false;
  
  ngOnInit() {
  }

  goBack() {
    this.location.back()  }
}