import { Injectable } from '@angular/core';
import { User } from '../modClass/user.model';
import { PostUser } from "../modClass/post-user";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  currentUser: PostUser = {
    email: '',
    password: ''
  };

  constructor( private http: HttpClient, public route: RouterModule  ) { }
  // tslint:disable-next-line:typedef
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }
  // tslint:disable-next-line:typedef
  postlogin( user: User ) {
    return this.http.post( environment.apiBaseUrl + '/login', user );
  }
}
