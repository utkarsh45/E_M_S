 import { Injectable } from '@angular/core';
 import {
   HttpRequest,
   HttpHandler,
   HttpInterceptor
 } from '@angular/common/http';
 import { AuthService } from './auth.service';

 @Injectable()
 export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler) {
     const accessToken = this.authService.getAccessToken();
     req = req.clone({
         setHeaders: {
         Authorization: `JWT ${ accessToken }` ,
         }
     });
     return next.handle(req);
 }
 }
