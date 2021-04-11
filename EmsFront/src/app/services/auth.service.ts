import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../modClass/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:27017/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor( private httpClient: HttpClient, public router: Router ) { }

  login( user: User ) {
    return this.httpClient.post<any>(`${this.API_URL}/login`, user)
      .subscribe( ( res: any ) => {
        localStorage.setItem('access_token', res.token);
        this.getDashboard(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['/dashboard' + res.msg._id]);
        });
      });
  }
  // tslint:disable-next-line:typedef

  loginUs(user: User) {

    return this.httpClient.post<any>( `${ this.API_URL }/login2`, user );

  }

   getAccessToken() {
     return localStorage.getItem('access_token');
   }

  getisLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['/login']);
    }
  }
  getDashboard(_id): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/dashboard/${_id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

