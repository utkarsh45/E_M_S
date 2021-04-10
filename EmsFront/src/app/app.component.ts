import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EmsFront';
  private socket: any;
  public data: any;

  constructor() {
    this.socket = io('http://localhost:27017');
  }

  public ngOnInit():void {
    this.socket.on('notification', data => {
      this.data = data;
      console.log(data);
    });
  }

}

