import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donation } from 'src/app/Model/Donation';
import { DonationService } from 'src/app/Service/donation.service';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit, AfterViewInit {

  constructor(private service: DonationService,
              private router: Router) { }
  
  donations:Donation[];

  displayedColumns: string[] = ['id', 'Nombre del Proyecto', 'Localidad', 'Monto Donado', 'Fecha de Donación', 'Comentario'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    let id=Number(localStorage.getItem("id"));
    this.service.getDonationUserId(id)
    .subscribe(data => {
      this.dataSource.data = data;
//      this.donations = response;
    });
  }

  returnHome():void{
    this.router.navigate(['listProject']);
  }
}
