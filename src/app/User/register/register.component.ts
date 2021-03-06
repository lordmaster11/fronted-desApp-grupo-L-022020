import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/Service/user.service';
import { NgForm } from '@angular/forms';
import { BaseFormUser } from 'src/app/Utils/base-form-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(private router:Router, private service:UserService, public loginForm: BaseFormUser) { }

  user: User=new User();
  message:any;

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.loginForm.baseForm.reset();
  }

  Registrar(): void {
    if (this.loginForm.baseForm.invalid) {
      return;
    }

    const formValue = this.loginForm.baseForm.value;
    this.subscription.add(
    this.service.createUser(formValue).subscribe((response) => {
      if (response) {
        localStorage.setItem("id",response.id.toString());
        localStorage.setItem("role", "ROLE_USER"); 
        this.service.show();
        this.router.navigate(['listProject']);
      }
    },
      (error: HttpErrorResponse) => {
        alert("El usuario con el email: "+ formValue.mail + " ya existe!!!");
      // Handle error
      })
    );
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }
}
