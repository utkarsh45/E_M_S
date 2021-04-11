import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

showSucessMessage: boolean;
serverErrorMessages: string;



  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSubmit( form: NgForm ) {
    this.userService.postUser( form.value ).subscribe( res => {
      this.showSucessMessage = true;
      setTimeout( () => this.showSucessMessage = false, 4000 );
      this.resetForm( form );
      this.router.navigate( [ 'login' ] );
    },
      err => {
        if ( err.status === 422 ) {
          this.serverErrorMessages = err.error.join( '<br/>' );
        }
        else {
          this.serverErrorMessages = 'Something went wrong... Please contact admin..';
        }
      }
    );
  }

  // tslint:disable-next-line:typedef
  resetForm( form: NgForm ) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
