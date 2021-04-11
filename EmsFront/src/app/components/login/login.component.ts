import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

showSucessMessage: boolean;
serverErrorMessages: string;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSubmit( form: NgForm ) {
    this.userService.postlogin( form.value ).subscribe( res => {
      this.showSucessMessage = true;
      console.log( res );
      setTimeout( () => this.showSucessMessage = false, 4000 );
      this.resetForm( form );
      this.router.navigate( [ 'dashboard/:id' ] );
    },
      err => {
        if ( err.status === 422 ) {
          this.serverErrorMessages = err.error.join( '<br/>' )
        }
        else {
          this.serverErrorMessages = 'Something went wrong... Please contact admin..';
        }
      }
    );
  }
  // tslint:disable-next-line:typedef
  resetForm( form: NgForm ) {
    this.userService.currentUser = {
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
