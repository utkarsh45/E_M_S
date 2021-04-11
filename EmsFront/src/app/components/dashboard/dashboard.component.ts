import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: Object = {};
  constructor( public authService: AuthService,
               private activatedRoute: ActivatedRoute ) {
      const id = this.activatedRoute.snapshot.paramMap.get('_id');
      this.authService.getDashboard(id).subscribe(res => {
        this.currentUser = res.msg;
      });
     }

  ngOnInit(): void {
  }

}
