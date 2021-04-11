import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  postUser: FormGroup;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

showSucessMessage: boolean;
serverErrorMessages: string;



  constructor ( public userService: UserService, public router: Router, public formBuilder: FormBuilder ) {
    this.postUser = this.formBuilder.group({
      fullName: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  registerUser() {
    this.userService.postUser(this.postUser.value).subscribe((res) => {
      if (res) {
        this.postUser.reset();
        this.router.navigateByUrl( 'login' );
      }
    })
  }
}
