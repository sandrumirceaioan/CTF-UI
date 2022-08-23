import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../shared/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ctf',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  triggerRefresh(): void {
    // this.authService.removeToken('ctf_at');
    // this.authService.setToken('ctf_rt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDUwN2RlNmZjMTkyMGJhZGJiNGQzOSIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJzYW5kcnVtaXJjZWFpb2FuQGdtYWlsLmNvbSIsImlhdCI6MTY2MTI3OTI4NiwiZXhwIjoxNjYxMjgwMTg2fQ.D7RqVtZbSyD9EU5ppq11r_kgbtIZ2bKCyn0KFoPHMFs')
    // this.authService.refresh().then(result => {
    //   console.log(result);
    // }).catch(error => {
    //   console.log(error);
    // });
  }

}
