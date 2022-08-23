import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../shared/models/forms.model';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPasswordText: boolean = false;
  remember: any = null;
  loginForm = new FormGroup<LoginForm>({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    remember: new FormControl(null)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logIn(): void {
    this.authService.signIn({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      remember: this.loginForm.value.remember,
    }).subscribe((result) => {
      this.router.navigate(['/app']);
    });
  }

}
