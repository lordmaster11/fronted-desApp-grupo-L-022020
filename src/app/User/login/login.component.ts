import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/Service/user.service';
import { BaseFormUser } from 'src/app/Utils/base-form-user';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(private router:Router,
              private service:UserService,
              public loginForm: BaseFormUser,
              public auth: AuthService
              ){}
  
  user: User=new User();
  message:any;

  ngOnInit(){
    this.loginForm.baseForm.get('name').setValidators(null);
    this.loginForm.baseForm.get('nick').setValidators(null);
    this.service.hide();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.loginForm.baseForm.reset();
  }

  onLogin(): void {
    if (this.loginForm.baseForm.invalid) {
      return;
    }

    const formValue = this.loginForm.baseForm.value;
    this.subscription.add(
      this.service.login(formValue).subscribe((response) => {
        if (response) {
          localStorage.setItem("id",response.id.toString()); 
          localStorage.setItem("role",response.role.toString()); 
          this.service.show();
          this.router.navigate(['listProject']);
        }  
      },
        (error: HttpErrorResponse) => {
          alert("Ingresó mal los datos");
        // Handle error
        })
    )
    ;
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }
/*
  Login(){
    if(this.user.name!= null || this.user.password!= null){
    this.service.login(this.user).subscribe((response) => {
      localStorage.setItem("id",response.id.toString()); 
      localStorage.setItem("role",response.role.toString()); 
      this.service.show();
      this.router.navigate(['listProject']);
      },
      (error: HttpErrorResponse) => {
        alert("Ingresó mal los datos");
      // Handle error
      });
    }else{
      alert("Debe ingresar todos los datos");
    }
  }*/
  
  Register(){
    this.router.navigate(["register"]);
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

}