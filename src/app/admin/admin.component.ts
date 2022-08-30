import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AdminService } from './admin.service';
import { AuthService } from '../shared/services/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditCategoryResolve } from './categories/edit-category/edit-category.resolve';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  navigationList: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private adminService: AdminService,
    private authService: AuthService
  ) {
    this.navigationList = this.adminService.getPages();
  }

  ngOnInit(): void {
  }

  createSideMenu() {

  }

  goToPage(url) {
    this.router.navigate([url]);
  }

  goBack() {
    this.navCtrl.back();
  }

  logout(): void {
    this.authService.logout();
  }

}