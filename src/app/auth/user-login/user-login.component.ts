import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,private router:Router) { }
   CREATE_ACCOUNT_URL=environment.OVID_BASE_URL+'CreateAccount?splashUrl=Facility'
   FORGOT_PASSWORD_URL=environment.OVID_BASE_URL+'ForgotPassword?splashUrl=Facility'
   authData: { username: string; password: string; };
   authResponse = {
    responseText: "Login to continue",
    responseColor: 'black'
  }
   loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  ngOnInit() {
  }

  onLogin() {
    this.authData = this.loginForm.value;
   let body = `grant_type=password&username=${encodeURIComponent(this.authData.username)}&password=${encodeURIComponent(this.authData.password)}`
    this.authService.authLogin(body)
      .subscribe(
        (response: Response) =>{          
          localStorage.setItem('authToken',JSON.stringify(response));
          this.authService.login(this.authData.username);
         }
          ,
        (error) => {
          this.loginForm.reset();
          this.authResponse.responseColor='red';
          if (error.status === 401)
             this.authResponse.responseText = "Invalid Credentials !!!";
          else this.authResponse.responseText = "Error occured Please try again"
      })
  }
  onCancel() {
    this.loginForm.reset();
  }

}
