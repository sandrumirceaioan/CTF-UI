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

  verifyAccessToken(): void {
    this.authService.verifyAccessToken().subscribe({
      next: (result) => {
        console.log('COMPONENT');
      },
      error: (error) => {
        //console.log(error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
