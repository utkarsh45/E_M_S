import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
} )
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.formBuilder.group( {
      email: [ '' ],
      password: [ '' ]
    } );
  }
  ngOnInit(): void {

  }
  // tslint:disable-next-line:typedef
  loginUser() {
    this.authService.loginUs( this.loginForm.value ).subscribe( ( res: any ) => {

      alert( res );
      console.log( res );
      if (res)
      {
        this.router.navigate( [ 'dashboard/' + res._id ] );
      }

      // this.currentUser = res;
      //  localStorage.setItem('access_token', res.token);
      //  this.getDashboard( res._id ).subscribe( ( res ) => {

      // } );
    } );
  }
   // tslint:disable-next-line:typedef
   onLogin() {

  //   //  this.authService.loginUs();
  }
}

