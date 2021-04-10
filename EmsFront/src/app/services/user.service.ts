import { Injectable } from '@angular/core';
import { User } from '../modClass/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor( private http: HttpClient ) { }
  // tslint:disable-next-line:typedef
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }
}
