import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../shared/models/forms.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.remember = this.authService.getRemember();
    if (this.remember) this.loginForm.setValue(this.remember);
  }

  logIn(): void {
    console.log(this.loginForm.value);
    this.authService.signIn({ email: this.loginForm.value.email, password: this.loginForm.value.password }).subscribe((result) => {
      if (this.loginForm.value.remember) {
        this.authService.setRemember(this.loginForm.value);
      }
    });
  }

}
