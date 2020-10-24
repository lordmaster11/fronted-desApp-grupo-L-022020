import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donation } from 'src/app/Model/Donation';
import { DonationService } from 'src/app/Service/donation.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  constructor(private service: DonationService,
              private router: Router) { }
  
  donations:Donation[];

  ngOnInit(): void {
    let id=Number(localStorage.getItem("id"));
    this.service.getDonationUserId(id)
    .subscribe(response => {
      this.donations = response;
    });
  }

  returnHome():void{
    this.router.navigate(['listProject']);
  }
}
